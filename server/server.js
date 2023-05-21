const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const PORT = process.env.PORT || 5000;
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const router = require("./router/mainRouter");
const path = require("path");
const ws = require("ws");
const https = require("https");
const fs = require("fs");

const wss = new ws.Server(
  {
    port: 4000,
  },
  () => console.log(`Socket Server started on 4000`)
);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public/img")));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    const server = app.listen(PORT, () =>
      console.log(`Server started on PORT=${PORT}`)
    );
    server.keepAliveTimeout = 30 * 1000;
    server.headersTimeout = 35 * 1000;
    // https
    //   .createServer(
    //     {
    //       key: fs.readFileSync("./res-sea.key"),
    //       cert: fs.readFileSync("./res-sea.crt"),
    //       requestCert: true,
    //       rejectUnauthorized: false,
    //     },
    //     app
    //   )
    //   .listen(PORT, () => {
    //     console.log(`start https on ${PORT}`);
    //   });
  } catch (e) {
    console.log(e);
  }
};

start();

wss.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message, id) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
