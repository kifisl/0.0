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
  } catch (e) {
    console.log(e);
  }
};

start();
