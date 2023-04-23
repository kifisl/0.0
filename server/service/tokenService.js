const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const tokenModel = require("../models/tokenModel");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await conn.token.findUnique({
      where: {
        UserID: userId,
      },
    });
    console.log(parseInt(tokenData.tokenID));
    if (JSON.stringify(tokenData) != "[]") {
      tokenData.refreshToken = refreshToken;
      return conn.token.update({
        data: {
          refreshToken: refreshToken,
          UserID: userId,
        },
        where: {
          tokenID: tokenData.tokenID,
        },
      });
    }

    const token = await conn.token.create({
      data: {
        UserID: userId,
        refreshToken: refreshToken,
      },
    });
    return token;
  }
}

module.exports = new TokenService();
