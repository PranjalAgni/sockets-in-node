const net = require("net");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const config = require("./config");

const rl = readline.createInterface({ input, output });

rl.on("line", (line) => {
  client.write(line); 
});

const client = new net.Socket();

client.connect(config.PORT, config.HOST, () => {
  const startTime = performance.now();
  let numMesaages = 10_00_000;
  while (numMesaages-- > 0) {
    client.write("Message sent " + numMesaages + "\n");
  }

  const endTime = performance.now();
  const timeTook = (endTime - startTime) / 1000;
  console.log("Time took for client ", Number(timeTook).toFixed(3));
});

// client.on("data", (data) => {
//   const clientCid = +data.toString().split(" ").pop();
//   // console.log("Got data from: ", clientCid);
//   const endTime = performance.now();
//   const timeTook = (endTime - clientConnectionTimeMap.get(clientCid)) / 1000;
//   console.log(
//     `Time took for client ${clientCid}: `,
//     Number(timeTook).toFixed(3)
//   );
//   // console.log("Recieved data: ", data.toString());
//   // client.destroy();
// });

client.on("close", () => {
  console.log("Connection closed");
});

client.on("error", (err) => {
  console.log("Error: ", err);
});

process.on("SIGINT", () => {
  console.log("Closing client");
  process.exit(0);
});
