import Elysia from "elysia";
import { cors } from "@elysiajs/cors";
import { html } from "@elysiajs/html";
import { Logestic } from "logestic";
import staticPlugin from "@elysiajs/static";
import { homePlugin } from "./home";
import { kitPlugin } from "@/app";



export const app = new Elysia()
  .use(kitPlugin())
  .use(cors())
  .use(html())
  .use(staticPlugin({
    assets: "static",
    prefix: "/static",
  }))
  .use(Logestic.preset("common"))
  .use(homePlugin)

export type App = typeof app;
