import { kitPlugin } from "@/app";
import Elysia from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";

export const dashboard = new Elysia()
  .use(kitPlugin)
  .get("/dashboard", (ctx) => {
    const { user } = ctx;
    let inner = (
      <div>
        <p>Not logged in!</p>
      </div>
    )


    if (user !== null) {
      inner = (
        <div>
          <h1>Logged in as:</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>

          <button hx-post="/logout">Log Out</button>
        </div>
      )
    }
  

    return (
      <BaseLayout>
        {inner}
      </BaseLayout>
    )

  })

