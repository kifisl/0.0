const jwt = require("jsonwebtoken");
require("dotenv").config();
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

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await conn.token.findUnique({
      where: {
        UserID: userId,
      },
    });
    if (JSON.stringify(tokenData) != "null") {
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

  async removeToken(refreshToken) {
    const tokenData = await conn.token.delete({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await conn.token.findUnique({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }
}

module.exports = new TokenService();
