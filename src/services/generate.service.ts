import { db } from "../clients/pgsql";
import { fakeApis } from "../db/schema";
import { generateFakeApi } from "./grok.service";
import { v4 as uuid } from "uuid";

export const generateApiService = async (
  prompt: string,
  limit: number,
): Promise<{
  apiId: string;
  route: string;
  apiUrl: string;
}> => {
  const { route, schema, data } = await generateFakeApi(prompt, limit);

  const apiId = uuid();
  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;

  await db.insert(fakeApis).values({
    id: apiId,
    route: normalizedRoute,
    schema_json: schema,
    data_json: data,
  });

  return {
    apiId,
    route: normalizedRoute,
    apiUrl: `/api/${apiId}${normalizedRoute}`,
  };
};
