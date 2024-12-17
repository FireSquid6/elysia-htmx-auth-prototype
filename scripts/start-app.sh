#!/usr/bin/env bash

bunx tailwindcss -i ./static/main.css -o ./static/generated.css 
bun run entrypoints/prod.ts
