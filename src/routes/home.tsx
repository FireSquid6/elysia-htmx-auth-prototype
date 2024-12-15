import { Elysia } from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";
import { kitPlugin } from "@/app";


export const home = new Elysia()
  .use(kitPlugin())
  .get("/", () => {
    return (
      <BaseLayout>
        <h1>Title</h1>
        <p class="text-blue-500">Hello, world!</p>
        <a href="/todos">todos page</a>
        <form hx-post="/user-form">
          <div>
            <label>Email</label>
            <input name="email" type="email" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="passsword" />
          </div>
          <button type="submit">Send</button>
        </form>
      </BaseLayout>
    )
  })
