import Elysia from "elysia";
import { cors } from "@elysiajs/cors";
import { html } from "@elysiajs/html";
import { Logestic } from "logestic";
import staticPlugin from "@elysiajs/static";
import { home } from "./home";
import { dashboard } from "./dashboard";
import { auth } from "./auth";
import { kitPlugin } from "@/app";
import { swagger } from "@elysiajs/swagger";

// all routes should be consumed here
export const routes = new Elysia()
  .get("/something-else", () => {
    return "blah";
  })
  .use(home)
  .use(auth)
  .use(dashboard)

export const devPlugin = new Elysia()


export const app = new Elysia()
  .use(kitPlugin())
  .use(cors())
  .use(html())
  .use(staticPlugin({
    assets: "static",
    prefix: "/static",
  }))
  .use(swagger())
  .use(Logestic.preset("common"))
  .use(routes)
  .get("/favicon.ico", () => {
    return Bun.file("./static/favicon.ico");
  });





export type App = typeof app;
