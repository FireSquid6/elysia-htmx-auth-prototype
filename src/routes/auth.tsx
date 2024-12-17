import { Elysia, t } from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";
import { TextInput } from "@/components/form";
import { kitPlugin } from "@/app";
import { createSession, createUser, generateSessionToken, getUserByEmail, invalidateSession, verifyPasswordHash } from "@/db/auth";
import type { Config } from "@/app";

function makeCookie(config: Config, token: string, expiresAt: Date): string {
  let cookie = ""

  switch (config.environment) {
    case "prod":
      cookie = `session=${token}; HttpOnly; SameSite=Lax, Expires=${expiresAt.toUTCString()}; Path=/; Secure;`;
      break;
    case "dev":
      cookie = `session=${token}; HttpOnly; SameSite=Lax, Expires=${expiresAt.toUTCString()}; Path=/;`;
      break;
  }

  return cookie

}

export const auth = new Elysia()
  .use(kitPlugin)
  .get("/login", () => {
    return (
      <BaseLayout>
        <form hx-post="/login">
          <TextInput name="email" type="email" label="Email" />
          <TextInput name="password" type="password" label="Password" />
          <button type="submit" class="btn btn-primary">Submit</button>

          <a hx-boost="true" href="/signup">Sign up instead</a>
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
    const session = await createSession(db, token, result.id);

    ctx.set.headers["set-cookie"] = makeCookie(config, token, session.expiresAt);
    ctx.set.headers["HX-Redirect"] = "/dashboard";
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })
  .get("/signup", () => {
    // TODO - confirm password
    return (
      <BaseLayout>
        <form hx-post="/signup">
          <TextInput name="email" type="email" label="Email" />
          <TextInput name="username" label="Username" />
          <TextInput name="password" type="password" label="Password" />
          <button type="submit" class="btn btn-primary">Submit</button>

          <a hx-boost="true" href="/login">Sign in instead</a>
        </form>
      </BaseLayout>
    )

  })
  .post("/signup", async (ctx) => {
    const { db, config } = ctx.store.kit;
    const { email, password, username } = ctx.body;

    const id = await createUser(db, {
      email,
      password,
      username,
    })

    const token = generateSessionToken();
    const session = await createSession(db, token, id);
    ctx.set.headers["set-cookie"] = makeCookie(config, token, session.expiresAt);
    ctx.set.headers["HX-Redirect"] = "/dashboard";

  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      username: t.String(),
    })
  })
  .post('/logout', (ctx) => {
    const { session, store: { kit } } = ctx;

    if (session === null) {
      ctx.set.status = "Unauthorized";
      return;
    }

    invalidateSession(kit.db, session.id);
    ctx.set.headers["set-cookie"] = makeCookie(kit.config, "", new Date());
  })


