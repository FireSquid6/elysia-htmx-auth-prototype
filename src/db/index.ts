import { drizzle } from "drizzle-orm/libsql";
import type { Config } from "@/app";

export type Database = ReturnType<typeof getDb>

export function getDb(config: Config) {
  return drizzle({
    connection: {
      url: config.url,
      authToken: config.token,
    }
  })
}
