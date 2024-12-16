import { Elysia, t } from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";
import { TextInput } from "@/components/form";
import { kitPlugin } from "@/app";
import { createSession, generateSessionToken, getUserByEmail, verifyPasswordHash } from "@/db/auth";


export const auth = new Elysia()
  .use(kitPlugin)
  .get("/login", () => {
    return (
      <BaseLayout>
        <form hx-target="#error" hx-post="/login">
          <div id="error" />
          <TextInput name="email" type="email" label="Email" />
          <TextInput name="username" label="Username"/>
          <TextInput name="password" type="password" label="Password" />
        </form>
      </BaseLayout>
    )
  })
  .post("/login", async (ctx) => {
    // TODO - return proper html if the request is bad
    // if blocked by validation it'll just return empty
    const { db, config } = ctx.store.kit;
    const { email, password } = ctx.body;

    const result = await getUserByEmail(db, email);
    if (result === null) {
      ctx.set.status = 400;
      // TODO - make this better
      return (
        <p>error!</p>
      )
    }

    if (!await verifyPasswordHash(result.password, password)) {
      ctx.set.status = 400;
      return (
        <p>Password issue!</p>
      )
    }

    const token = generateSessionToken();
    const { expiresAt } = await createSession(db, token, result.id);
    let cookie = ""

    switch (config.environment) {
      case "prod":
        cookie = `session=${token}; HttpOnly; SameSite=Lax, Expires=${expiresAt.toUTCString()}; Path=/; Secure;`;
        break;
      case "dev":
        cookie = `session=${token}; HttpOnly; SameSite=Lax, Expires=${expiresAt.toUTCString()}; Path=/;`;
        break;
    }
    ctx.headers["Set-Cookie"] = cookie;
    ctx.redirect("/dashboard", 301) 
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })
  .get("/signup", () => {

  })
  .post("/signup", () => {

  })
  .post('/logout', () => {

  })
