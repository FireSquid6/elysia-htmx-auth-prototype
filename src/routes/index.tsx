import Elysia from "elysia";
import type { Kit } from "@/app";

export const kitPlugin = new Elysia()
  .state("kit", {} as Kit)

export const app = new Elysia()
  .use(kitPlugin)
  .get("/", () => {
    return "hello, world!"
  })

export type App = typeof app;
