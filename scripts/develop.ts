#!/usr/bin/env bun
import type { Subprocess } from "bun";
import { watch } from "fs";
import path from "path";

const TAILWIND_BUILD_COMMAND = "bunx tailwindcss -i ./static/main.css -o ./static/generated.css";
const START_COMMAND = "bun run entrypoints/dev.ts";
const TOPIC_NAME = "update";
const PORT: number = 3230


function isNumeric(s: string): boolean {
  return !isNaN(parseFloat(s));
}

let subprocess: Subprocess<"ignore", "inherit", "inherit"> | null = null;
let canRebuild: boolean = true;

function restartProcess() {
  Bun.spawnSync(TAILWIND_BUILD_COMMAND.split(" "), {
    stdout: "inherit",
    stdin: "ignore",
    stderr: "inherit",
  });
  if (subprocess !== null) {
    subprocess.kill();
  }
  subprocess = Bun.spawn(START_COMMAND.split(" "), {
    stdout: "inherit",
    stdin: "ignore",
    stderr: "inherit",
  });
}


function main() {
  restartProcess();

  const server = Bun.serve({
    port: PORT,
    fetch(req, server) {
      const success = server.upgrade(req);

      if (success) {
        return undefined;
      }

      return new Response();
    },
    websocket: {
      async message() { },
      async open(ws) {
        ws.subscribe(TOPIC_NAME);
      },
    }
  })

  const filepath = path.join(process.cwd(), "src");

  const watcher = watch(filepath, { recursive: true }, (_, filename) => {
    if (!canRebuild) {
      return;
    }

    if (filename === null) {
      return;
    }

    if (filename.length === 0) {
      return;
    }

    if (filename.charAt(filename.length - 1) == "~") {
      return;
    }

    if (isNumeric(filename.split("/").pop() ?? "")) {
      return;
    }

    console.log("---------------------");
    console.log(`Change in ${filename}`);
    console.log("---------------------");
    canRebuild = false;
    restartProcess();

    // we ensure that too many rebuilds can't happen
    setTimeout(() => {
      canRebuild = true;
    }, 200);

    server.publish(TOPIC_NAME, "reload");
  })

  watcher.on("close", () => {
    console.log("watcher closed");
    process.kill(1);
  })

  watcher.on("error", () => {
    console.log("watcher error");
    process.kill(1);
  })
}


main();
