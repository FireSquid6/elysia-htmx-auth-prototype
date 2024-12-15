import Elysia from "elysia";
import type { Kit } from "@/app";
import { cors } from "@elysiajs/cors";
import { Logestic } from "logestic";

export const kitPlugin = new Elysia()
  .state("kit", {} as Kit)

export const app = new Elysia()
  .use(kitPlugin)
  .use(cors())
  .use(Logestic.preset("common"))
  .get("/", () => {
    return "hello, world!"
  })

export type App = typeof app;
