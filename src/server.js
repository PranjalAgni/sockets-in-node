const net = require("net");
const config = require("./config");

const { HOST, PORT } = config;

// creating a TCP server
net
  .createServer((socket) => {
    console.log("Connected to ", socket.remoteAddress, ":", socket.remotePort);

    socket.on("data", (data) => {
      console.log("Recieved data: ", data.toString());
      socket.write("Hello from server");
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
