const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const hostName = process.env.HOST || "localhost";
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  hostName,
  port,
});

const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  server.get("/service-worker.js", (req, res) => {
    app.serveStatic(req, res, "./.next/service-worker.js");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
  });
});
