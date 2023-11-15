const net = require("net");
const config = require("./config");

const { HOST, PORT } = config;

/**
 * @type {net.Socket[]}
 */
const tcpConnectionsToSever = [];

// creating a TCP server
net
  .createServer((socket) => {
    tcpConnectionsToSever.push(socket);
    console.log(`Connected to ${socket.remoteAddress}:${socket.remotePort}`);
    socket.on("data", (data) => {
      const cid = data.toString();
      console.log(cid + " from ", socket.remotePort);
      socket.write(`Server says hello ${cid}`);
    });

    socket.on("close", () => {
      console.log(
        "Closed connection ",
        socket.remoteAddress,
        ":",
        socket.remotePort
      );
    });
  })
  .listen(PORT, HOST, () => {
    console.log("Server running at ", HOST, ":", PORT, "\n");
  });

process.on("SIGINT", () => {
  console.log("Closing all connections");
  for (const socket of tcpConnectionsToSever) {
    socket.destroy();
  }

  console.log("Closed all connections");
  process.exit(0);
});
