import { app } from "@/routes";
import { getDb, type Database } from "./db";

export interface Kit {
  config: Config;
  db: Database;
}

export interface Config {
  port: number;
  url: string;
  token: string;
}

export function makeConfig(config: Partial<Config>): Config {

  return {
    port: config.port ?? 3120,
    url: config.url ?? "",
    token: config.token ?? "",
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
    console.log(`App started on ${config.port}`);
  })
}
