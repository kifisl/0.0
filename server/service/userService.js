const uuid = require("uuid");
require("dotenv").config();
const bcrypt = require("bcrypt");
const mailService = require("./mailService");
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const tokenService = require("./tokenService");
const UserDto = require("../dtos/user_dto");
const ApiError = require("../exceptions/api_error");

const UserModel = require("../models/userModel");
const method = new UserModel();

class UserService {
  async registration(email, password) {
    const candidate = conn.users.findMany({
      where: { UserEmail: email },
    });

    if (JSON.stringify(candidate) != "{}") {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await conn.users.create({
      data: {
        UserEmail: email,
        UserPassword: hashPassword,
        ActivationLink: activationLink,
      },
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user); //id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await conn.users.findMany({
      where: { ActivationLink: activationLink },
    });
    if (JSON.stringify(user) == "{}") {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    await conn.users.update({
      where: { ActivationLink: activationLink },
      data: {
        UserID: user.UserID,
        UserEmail: user.UserEmail,
        UserPassword: user.UserPassword,
        UserRole: user.UserRole,
        IsActivated: true,
      },
    });
  }

  async login(email, password) {
    const user = await conn.users.findUnique({
      where: { UserEmail: email },
    });

    if (user == null) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} не был найден`
      );
    }
    const isPassEquals = await bcrypt.compare(password, user.UserPassword);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      console.log("service refresh");
      throw ApiError.UnathorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || tokenFromDB == null) {
      throw ApiError.UnathorizedError();
    }
    const user = await conn.users.findUnique({
      where: { UserID: tokenFromDB.UserID },
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await conn.users.findMany();
    return users;
  }
}

module.exports = new UserService();
