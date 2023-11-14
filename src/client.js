const net = require("net");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const config = require("./config");

const rl = readline.createInterface({ input, output });
const client = new net.Socket();

let isConnectionDone = false;
rl.on("line", (line) => {
  console.log("Line ", line);
  if (isConnectionDone) {
    client.write(line);
  }
  rl.write("You gave me this?  " + line);
});

client.connect(config.PORT, config.HOST, () => {
  console.log("Connected to ", config.HOST, ":", config.PORT);
  client.write("Hello from client");
  isConnectionDone = true;
});

client.on("data", (data) => {
  console.log("Recieved data: ", data);
  // client.destroy();
});

client.on("close", () => {
  console.log("Connection closed");
});

client.on("error", (err) => {
  console.log("Error: ", err);
});
