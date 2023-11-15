const net = require("net");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const config = require("./config");

const NUM_CONNECTIONS = 10_000;
let failedConnections = 0;
const rl = readline.createInterface({ input, output });

rl.on("line", (line) => {
  if (isConnectionDone) {
    client.write(line);
  }
});

for (let cid = 0; cid < NUM_CONNECTIONS; cid++) {
  const client = new net.Socket();
  client.connect(config.PORT, config.HOST, () => {
    console.log(`[${cid + 1}] Connected to server`);
    client.write(String(cid + 1));
  });

  client.on("data", (data) => {
    console.log("Recieved data: ", data.toString());
    // client.destroy();
  });

  client.on("close", () => {
    console.log("Connection closed");
  });

  client.on("error", (err) => {
    failedConnections += 1;
    console.log("Error: ", err);
  });
}

process.on("SIGINT", () => {
  console.log("Closing client");
  console.log("Failed connections: ", failedConnections);
  process.exit(0);
});

// client.connect(config.PORT, config.HOST, () => {
//   console.log("Connected to ", config.HOST, ":", config.PORT);
//   client.write("Hello from client");
// });
