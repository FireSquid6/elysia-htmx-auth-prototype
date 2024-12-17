import { Elysia } from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";
import { kitPlugin } from "@/app";


export const home = new Elysia()
  .use(kitPlugin())
  .get("/", () => {
    return (
      <BaseLayout>
        <h1 class="text-3xl text-red-500">Neat Title</h1>
        <a hx-boost="true" href="/login">Sign In</a>
        <button class="btn" hx-post="/some-error">Do something cool</button>
      </BaseLayout>
    )
  })
  .post("/some-error", (ctx) => {
    ctx.set.status = "Internal Server Error";
    const number = Math.random() % 100;

    return "This is my error message! " + number;
  })
