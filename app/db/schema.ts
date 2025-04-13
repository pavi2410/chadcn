import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const registryTable = sqliteTable("registry", {
  id: int().primaryKey({ autoIncrement: true }),
  url: text().notNull(),
  registryJsonContent: text().notNull(),
  createdAt: text().notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
