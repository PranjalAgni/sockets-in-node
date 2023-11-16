const net = require("net");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const config = require("./config");

const NUM_CONNECTIONS = 10000;
let failedConnections = 0;
const rl = readline.createInterface({ input, output });

rl.on("line", (line) => {
  if (isConnectionDone) {
    client.write(line);
  }
});

/**
 * @type {Map<number, number>}
 */
const clientConnectionTimeMap = new Map();

for (let cid = 0; cid < NUM_CONNECTIONS; cid++) {
  const client = new net.Socket();
  clientConnectionTimeMap.set(cid + 1, performance.now());
  client.connect(config.PORT, config.HOST, () => {
    console.log(`[${cid + 1}] Connected to server`);
    client.write(String(cid + 1));
  });

  client.on("data", (data) => {
    const clientCid = +data.toString().split(" ").pop();
    // console.log("Got data from: ", clientCid);
    const endTime = performance.now();
    const timeTook = (endTime - clientConnectionTimeMap.get(clientCid)) / 1000;
    console.log(
      `Time took for client ${clientCid}: `,
      Number(timeTook).toFixed(3)
    );
    // console.log("Recieved data: ", data.toString());
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
