
export interface Config {
  port: number;
}

export function makeConfig(config: Partial<Config>): Config {
  return {
    port: config.port ?? 3120,
  }
}

export function startApp() {

}
