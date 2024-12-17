#!/usr/bin/env bun

import { getDb } from "@/db";
import { makeConfig } from "@/app";
import { faker } from "@faker-js/faker";
import { createUser } from "@/db/auth";

const config = makeConfig({
  databaseUrl: process.env.DEV_DATABASE_URL,
})


const db = getDb(config);

// add fake users
for (let i = 0; i < 10; i++) {
  await createUser(db, {
    username: faker.internet.username(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  })
}

await createUser(db, {
  username: "Grock",
  password: "lumberandlogs",
  email: "josh@grock.com",
})
