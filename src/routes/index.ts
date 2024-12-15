import Elysia from "elysia";
import type { Kit } from "@/app";
import { cors } from "@elysiajs/cors";
import { html } from "@elysiajs/html";
import { Logestic } from "logestic";

export const kitPlugin = new Elysia()
  .state("kit", {} as Kit)

export const app = new Elysia()
  .use(kitPlugin)
  .use(cors())
  .use(html())
  .use(Logestic.preset("common"))
  .get("/", () => {
    return "hello, world!"
  })

export type App = typeof app;
