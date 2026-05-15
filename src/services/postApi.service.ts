import pool from "../clients/pgsql";
import { ERROR_CODES } from "../constants/errorCodes";
import AppError from "../errors/AppError";
import { validate } from "../utils/validateData";

export const postApiService = async (
  apiId: string,
  route: string,
  data: any,
) => {
  const target = await pool.query(
    `
        SELECT * FROM fake_apis
        WHERE id = $1 AND route = $2;
    `,
    [apiId, `/${route}`],
  );

  if (target.rows.length === 0) {
    throw new AppError("API Id not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  const targetRow = target.rows[0];
  console.log("SCHEMA", targetRow.schema)
  console.log("target ROW", targetRow)

  validate(targetRow.schema_json, data);

  await pool.query(
    `
        UPDATE fake_apis
        SET data_json = data_json || jsonb_build_array($1::jsonb)
        WHERE id = $2;
    `,
    [data, apiId],
  );

  return data;
};
