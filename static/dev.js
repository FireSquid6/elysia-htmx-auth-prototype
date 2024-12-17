const REFRESH_SERVER_PORT = 3230

async function main() {
  const inDevMode = window.origin.startsWith("http://localhost");

  if (!inDevMode) {
    return;
  }

  const socket = new WebSocket(`http://localhost:${REFRESH_SERVER_PORT}`);

  socket.onmessage = async (message) => {
    if (message.data === "reload") {
      await wait();
      location.reload(true);
    }
  }
}


async function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 100);
  })
}

main();
