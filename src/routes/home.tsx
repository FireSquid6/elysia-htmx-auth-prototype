import Elysia from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";

export const homePlugin = new Elysia()
  .get("/", () => {
    return (
      <BaseLayout>
        <h1>Title</h1>
        <p class="text-blue-500">Hello, world!</p>
        <a href="/todos">todos page</a>
      </BaseLayout>
    )
  })
