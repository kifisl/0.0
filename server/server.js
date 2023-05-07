const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const PORT = process.env.PORT || 5000;
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const router = require("./router/mainRouter");

const app = express();

app.use(express.json());
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
    app.listen(PORT, () => console.log(`Server started on PORT=${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
