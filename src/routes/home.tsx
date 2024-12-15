import { Elysia, t } from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";
import { kitPlugin } from "@/app";
import { usersTable } from "@/db/schema";
import { newId } from "@/db/id";

export const homePlugin = new Elysia()
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
  .post("/user-form", async (ctx) => {
    const { email, password } = ctx.body;
    const { db } = ctx.store.kit;

    await db.insert(usersTable).values({
      email,
      password,
      id: newId(),
      age: 13,
    });

    return (
      <div>
        done!
      </div>
    );

  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })
