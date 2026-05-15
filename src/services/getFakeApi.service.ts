import pool from "../clients/pgsql";
import { ERROR_CODES } from "../constants/errorCodes";
import AppError from "../errors/AppError";

export const getFakeAPI = async (apiId: string, route: string) => {
    console.log("[INFO]", "getAPI", apiId, route)
  const target = await pool.query(
    `SELECT * FROM fake_apis WHERE id = $1 AND route = $2`,
    [apiId, `/${route}`],
  );

  if (target.rows.length === 0) {
    throw new AppError("API Id not found", 404, ERROR_CODES.NOT_FOUND_ERROR);
  }

  return target.rows[0]
};
