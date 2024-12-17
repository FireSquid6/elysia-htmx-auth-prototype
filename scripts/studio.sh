#!/usr/bin/env bash

while test $# -gt 0; do
  case "$1" in
    -d|--dev)
      echo "DEV STUDIO"
      bunx drizzle-kit studio --config=./drizzle-configs/dev.config.ts
      shift
      ;;
    -p|--prod)
      echo "PROD STUDIO"
      bunx drizzle-kit studio --config=./drizzle-configs/prod.config.ts
      shift
      ;;
  esac
done

