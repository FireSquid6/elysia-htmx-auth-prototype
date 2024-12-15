import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: text().primaryKey().unique().notNull(),
  password: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
}, () => []);
