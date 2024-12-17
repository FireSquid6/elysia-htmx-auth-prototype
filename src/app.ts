import { app } from "@/routes";
import { Elysia } from "elysia";
import { getDb, type Database } from "./db";
import { validateSessionToken, type SessionValidationResult } from "./db/auth";

export interface Kit {
  config: Config;
  db: Database;
}

export interface Config {
  port: number;
  url: string;
  token: string;
  environment: "prod" | "dev";
}

export function kitPlugin() {
  return new Elysia()
    .state("kit", {} as Kit)
    .derive(async ({ cookie: { session }, store: { kit } }): Promise<SessionValidationResult> => {
      const token = session.value;

      if (token === undefined) {
        return {
          session: null,
          user: null,
        }
      }
      const result = await validateSessionToken(kit.db, token);
      return result;
    })
}

export function makeConfig(config: Partial<Config>): Config {
  return {
    port: config.port ?? 3120,
    url: config.url ?? "",
    token: config.token ?? "",
    environment: config.environment ?? "dev",
  }
}

export function startApp(c: Partial<Config>) {
  const config = makeConfig(c);
  const db = getDb(config);

  const kit: Kit = {
    config,
    db,
  }

  app.store.kit = kit;

  app.listen(config.port, () => {
    console.log(`🚀 App started on http://localhost:${config.port}`);
  })
}
