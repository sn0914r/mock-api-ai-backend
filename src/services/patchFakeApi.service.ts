import pool from "../clients/pgsql";
import { ERROR_CODES } from "../constants/errorCodes";
import AppError from "../errors/AppError";
import { validatePatch } from "../utils/validatePatchData";

export const patchFakeApi = async (
  apiId: string,
  route: string,
  elementId: string,
  data: Record<string, any>,
) => {
  const target = await pool.query(
    `
        SELECT * FROM fake_apis
        WHERE id=$1 AND route=$2;
        `,
    [apiId, `/${route}`],
  );

  if (target.rows.length === 0) {
    throw new AppError("Api not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  const targetRow = target.rows[0];

  validatePatch(targetRow.schema_json, data);

  const data_json = targetRow.data_json;
  const targetElementIndex = data_json.findIndex(
    (e: Record<string, any>) => e.id === Number(elementId),
  );

  if (targetElementIndex === -1) {
    throw new AppError("Record not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  const updatedData = {
    ...data_json[targetElementIndex],
    ...data,
    id: Number(elementId),
  };

  data_json[targetElementIndex] = updatedData;

  await pool.query(
    `
    UPDATE fake_apis
    SET data_json = $1
    WHERE id = $2;
    `,
    [JSON.stringify(data_json), apiId],
  );

  return updatedData;
};
