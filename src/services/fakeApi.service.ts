import pool from "../clients/pgsql";
import { ERROR_CODES } from "../constants/errorCodes";
import AppError from "../errors/AppError";
import { validateFakeApiData } from "../utils/validateFakeApiData";
import { validateFakeApiDataForPatch } from "../utils/validateFakeApiDataForPatch";

export const getFakeApi = async (apiId: string, route: string) => {
  const result = await pool.query(
    `
        SELECT * FROM fake_apis
        WHERE id=$1 AND route=$2;   
    `,
    [apiId, `/${route}`],
  );

  if (result.rows.length === 0) {
    throw new AppError("Api not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  return result.rows[0];
};

export const postFakeApi = async (
  apiId: string,
  route: string,
  data: Record<string, unknown>,
) => {
  const target = await getFakeApi(apiId, route);
  validateFakeApiData(target.schema_json, data);

  await pool.query(
    `
        UPDATE fake_apis
        SET data_json = data_json || jsonb_build_array($1::jsonb)
        WHERE id=$2;
    `,
    [data, apiId],
  );
  return data;
};

export const putFakeApi = async (
  apiId: string,
  route: string,
  elementId: string,
  data: Record<string, any>,
) => {
  const target = await getFakeApi(apiId, route);

  const data_json = target.data_json;
  const targetElementIndex = getElementIndexOrThrow(data_json, elementId);

  const updatedElement = { id: Number(elementId), ...data };
  validateFakeApiData(target.schema_json, updatedElement);

  data_json[targetElementIndex] = updatedElement;

  await pool.query(
    `
        UPDATE fake_apis
        SET data_json=$1
        WHERE id=$2  
    `,
    [JSON.stringify(data_json), apiId],
  );

  return updatedElement;
};

export const patchFakeApi = async (
  apiId: string,
  route: string,
  elementId: string,
  data: Record<string, any>,
) => {
  const target = await getFakeApi(apiId, route);
  validateFakeApiDataForPatch(target.schema_json, data);

  const data_json = target.data_json;
  const targetElementIndex = getElementIndexOrThrow(data_json, elementId);

  const updatedElement = {
    ...data_json[targetElementIndex],
    ...data,
    id: Number(elementId),
  };

  data_json[targetElementIndex] = updatedElement;

  await pool.query(
    `
        UPDATE fake_apis
        SET data_json=$1
        WHERE id=$2
    `,
    [JSON.stringify(data_json), apiId],
  );

  return updatedElement;
};

export const deleteFakeApi = async (
  apiId: string,
  route: string,
  elementId: string,
): Promise<void> => {
  const target = await getFakeApi(apiId, route);

  getElementIndexOrThrow(target.data_json, elementId);

  const filteredData = target.data_json.filter(
    (e: Record<string, any>) => e.id !== Number(elementId),
  );

  await pool.query(
    `
        UPDATE fake_apis
        SET data_json=$1
        WHERE id=$2
    `,
    [JSON.stringify(filteredData), apiId],
  );
};

/**
 * Service utils
 */

const getElementIndexOrThrow = (
  data: Record<string, any>[],
  elementId: string,
): number => {
  const targetElementIndex = data.findIndex((e) => e.id === Number(elementId));

  if (targetElementIndex === -1) {
    throw new AppError("Record not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  return targetElementIndex;
};
