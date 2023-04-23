const uuid = require("uuid");
require("dotenv").config();
const bcrypt = require("bcrypt");
const mailService = require("./mailService");
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const tokenService = require("./tokenService");
const UserDto = require("../dtos/user_dto");
const ApiError = require("../exceptions/api_error");

class UserService {
  async registration(email, password) {
    //console.log(email, password);
    const candidate = conn.users.findMany({
      where: { UserEmail: email },
    });
    console.log(JSON.stringify(candidate));
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
}

module.exports = new UserService();
