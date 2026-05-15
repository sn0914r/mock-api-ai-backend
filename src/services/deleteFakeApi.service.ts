import pool from "../clients/pgsql";
import { ERROR_CODES } from "../constants/errorCodes";
import AppError from "../errors/AppError";

export const deleteFakeApi = async (
  apiId: string,
  route: string,
  elementId: string,
): Promise<void> => {
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
  const filteredData = targetRow.data_json.filter(
    (e: Record<string, any>) => e.id !== Number(elementId),
  );

  await pool.query(
    `
    UPDATE fake_apis
    SET data_json = $1
    WHERE id=$2
    `,
    [JSON.stringify(filteredData), apiId],
  );

  return;
};
