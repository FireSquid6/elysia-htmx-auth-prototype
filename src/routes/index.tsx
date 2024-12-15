import { kitPlugin } from "@/app";
import Elysia from "elysia";

export const app = new Elysia()
  .use(kitPlugin)
  .get("/", () => {
    return "hello, world!"
  })

export type App = typeof app;
