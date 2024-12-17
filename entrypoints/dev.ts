import { startApp } from "@/app";

const url = process.env.DEV_DATABASE_URL;

if (url === undefined) {
  console.log("Fatal error: missing database url")

  process.exit(1);
}


startApp({
  url,
});
