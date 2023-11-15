module.exports = {
  apps: [
    {
      exec_mode: "cluster",
      name: "tcpserver",
      script: "src/server.js",
      instances: 0,
      watch: true,
    },
  ],
};
