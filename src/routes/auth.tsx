import { Elysia } from "elysia";
import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";
import { Form, TextInput } from "@/components/form";


export const auth = new Elysia()
  .get("/login", () => {
    return (
      <BaseLayout>
        <Form>
          <TextInput name="email" type="email" label="Email" />
          <TextInput name="username" label="Username"/>
          <TextInput name="password" type="password" label="Password" />
        </Form>
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
