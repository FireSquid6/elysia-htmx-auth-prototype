const REFRESH_SERVER_PORT = 3230

async function main() {
  if (window.origin.startsWith("http://localhost")) {
    dev();
  }

  htmx.config.responseHandling = [
    { code: "204",
      swap: false,
    },
    { 
      code: "[23]..", 
      swap: true,
    },
    { 
      code: "[45]..", 
      swap: true, 
      error: true,
      target: "#error",
    },
  ]
  console.log(htmx.config.responseHandling);
}

async function dev() {
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
