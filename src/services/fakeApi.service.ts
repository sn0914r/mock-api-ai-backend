import { and, eq } from "drizzle-orm";
import { db } from "../clients/pgsql";
import { ERROR_CODES } from "../constants/errorCodes";
import { fakeApis } from "../db/schema";
import AppError from "../errors/AppError";
import { validateFakeApiData } from "../utils/validateFakeApiData";
import { validateFakeApiDataForPatch } from "../utils/validateFakeApiDataForPatch";

export const getFakeApi = async (apiId: string, route: string) => {
  const [result] = await db
    .select()
    .from(fakeApis)
    .where(and(eq(fakeApis.id, apiId), eq(fakeApis.route, `/${route}`)));

  if (!result) {
    throw new AppError("Api not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  return result;
};

export const postFakeApi = async (
  apiId: string,
  route: string,
  data: Record<string, unknown>,
) => {
  const target = await getFakeApi(apiId, route);
  validateFakeApiData(target.schema_json, data);

  const updatedDataJson = [...target.data_json, data];

  await db
    .update(fakeApis)
    .set({
      data_json: updatedDataJson,
    })
    .where(eq(fakeApis.id, apiId));

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

  await db
    .update(fakeApis)
    .set({ data_json: data_json })
    .where(eq(fakeApis.id, apiId));

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

  await db.update(fakeApis).set({ data_json }).where(eq(fakeApis.id, apiId));

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

  await db
    .update(fakeApis)
    .set({ data_json: filteredData })
    .where(eq(fakeApis.id, apiId));
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
