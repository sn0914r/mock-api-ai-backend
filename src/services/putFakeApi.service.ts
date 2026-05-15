import pool from "../clients/pgsql";
import { ERROR_CODES } from "../constants/errorCodes";
import AppError from "../errors/AppError";
import { validate } from "../utils/validateData";

export const putFakeApi = async (
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
    throw new AppError("API id not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  const targetRow = target.rows[0];
  const targeData = targetRow.data_json;

  const targetElementIndex = targeData.findIndex(
    (e: Record<string, any>) => e.id === Number(elementId),
  );

  if (targetElementIndex === -1) {
    throw new AppError("Record not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  const updatedElement = {
    id: Number(elementId),
    ...data,
  };

  targeData[targetElementIndex] = updatedElement;

  validate(targetRow.schema_json, updatedElement);

  await pool.query(
    `
    UPDATE fake_apis
    SET data_json = $1
    WHERE id = $2
    `,
    [JSON.stringify(targeData), apiId],
  );

  return updatedElement;
};
