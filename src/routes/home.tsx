import { Elysia } from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";
import { kitPlugin } from "@/app";


export const home = new Elysia()
  .use(kitPlugin())
  .get("/", () => {
    return (
      <BaseLayout>
        <h1>A new thing</h1>
        <a hx-boost="true" href="/login">Sign In</a>
      </BaseLayout>
    )
  })
