#!/usr/bin/env bash

while test $# -gt 0; do
  case "$1" in
    -d|--dev)
      echo "MIGRATING DEV:"
      bunx drizzle-kit migrate --config=./drizzle-configs/dev.config.ts
      shift
      ;;
    -p|--prod)
      echo "MIGRATING PROD:"
      bunx drizzle-kit migrate --config=./drizzle-configs/prod.config.ts
      shift
      ;;
  esac
done




