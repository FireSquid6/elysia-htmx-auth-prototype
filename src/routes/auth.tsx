import { Elysia } from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";


export const auth = new Elysia()
  .get("/login", () => {
    return (
      <BaseLayout>
        <></>
      </BaseLayout>
    )
  })
  .post("/login", () => {

  })
  .get("/signup", () => {

  })
  .post("/signup", () => {

  })
  .post('/logout', () => {

  })
