import { startApp } from "@/app";

const url = process.env.TURSO_DATABASE_URL
const token = process.env.TURSO_AUTH_TOKEN


if (url === undefined || token === undefined) {
  console.log("Fatal error: missing auth token or url. You need a .env.local with both of them or the app won't work")

  process.exit(1);
}


startApp({});
