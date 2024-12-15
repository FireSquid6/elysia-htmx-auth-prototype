import { app } from "@/routes";

export interface Kit {
  config: Config;
}

export interface Config {
  port: number;
}

export function makeConfig(config: Partial<Config>): Config {

  return {
    port: config.port ?? 3120,
  }
}

export function startApp(c: Partial<Config>) {
  const config = makeConfig(c);
  const kit: Kit = {
    config: config,
  }

  app.store.kit = kit;

  app.listen(config.port, () => {
    console.log(`App started on ${config.port}`);
  })
}
