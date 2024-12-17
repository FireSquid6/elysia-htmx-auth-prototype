import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/prod",
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DEV_DATABASE_URL!,
  },
})
