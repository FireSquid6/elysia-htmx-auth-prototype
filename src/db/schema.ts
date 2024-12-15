import type { InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text().primaryKey().unique().notNull(),
  password: text().notNull(),
  age: int().notNull(),
  username: text().notNull(),
  email: text().notNull().unique(),
}, () => []);

export type User = InferSelectModel<typeof usersTable>
export type Session = InferSelectModel<typeof sessionsTable>

export const sessionsTable = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: int("user_id").notNull().references(() => usersTable.id),
  expiresAt: int("expires_at", {
    mode: "timestamp"
  }).notNull()
}, () => []);


