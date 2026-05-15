import pool from "../clients/pgsql";
import { generateFakeApi } from "./grok.service";
import { v4 as uuid } from "uuid";

export const generateApiService = async (prompt: string, limit: number) => {
  const { route, schema, data } = await generateFakeApi(prompt, limit);

  const apiId = uuid();
  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;

  await pool.query(
    `
    INSERT INTO fake_apis (id, route, schema_json, data_json) VALUES ($1, $2, $3, $4)`,
    [apiId, normalizedRoute, JSON.stringify(schema), JSON.stringify(data)],
  );

  return {
    apiId,
    route: normalizedRoute,
    apiUrl: `/api/${apiId}${normalizedRoute}`,
  };
};
