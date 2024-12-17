#!/usr/bin/env bash


echo "GENERATING FOR DEV:"
bunx drizzle-kit generate --config=./drizzle-configs/dev.config.ts
echo "GENERATING FOR PROD:"
bunx drizzle-kit generate --config=./drizzle-configs/prod.config.ts
