import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

export const fakeApis = pgTable("fake_apis", {
  id: uuid("id").primaryKey(),
  route: text("route").notNull(),
  schema_json: jsonb("schema_json").$type<Record<string, string>>().notNull(),
  data_json: jsonb("data_json").$type<Record<string, any>[]>().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
