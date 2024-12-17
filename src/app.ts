import { app } from "@/routes";
import { Elysia } from "elysia";
import { getDb, type Database } from "./db";
import { validateSessionToken, type SessionValidationResult } from "./db/auth";
import chalk from "chalk";

export interface Kit {
  config: Config;
  db: Database;
}

export interface Config {
  port: number;
  databaseUrl: string;
  databaseToken: string;
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
    databaseUrl: config.databaseUrl ?? "",
    databaseToken: config.databaseToken ?? "",
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
    const url = chalk.blue.bold(`http://localhost:${config.port}`)
    const dbUrl = chalk.blue.bold(config.databaseUrl);
    console.log(`🚀 App started on ${url}`);
    console.log(`💾 Database connected too ${dbUrl}`);
    console.log();
  })
}
