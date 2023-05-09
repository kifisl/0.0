const stripe = require(stripe)(
  "sk_test_51N5GkcJkvMrPJGV3uIaaUy6u4fDMlMHY1UKR8HJdSja6h4pBHluK3GwacjFy0t5Pkt0ZMqe2Vwjz3VvpMPt44DKg00VulSdFNp"
);
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

const paymentOrder = async (basketID) => {};
