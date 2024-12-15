import Elysia from "elysia";

export const app = new Elysia()
  .get("/", () => {
    return "hello, world!"
  })
