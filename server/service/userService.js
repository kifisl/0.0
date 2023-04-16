const uuid = require("uuid");
require("dotenv").config();
const bcrypt = require("bcrypt");
const mailService = require("./mailService");
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const tokenService = require("./tokenService");
const UserDto = require("../dtos/user_dto");

class UserService {
  async registration(email, password) {
    //console.log(email, password);
    const candidate = conn.users.findUnique({
      where: { UserEmail: email },
    });
    console.log(JSON.stringify(candidate));
    if (JSON.stringify(candidate) != "{}") {
      throw new Error(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await conn.users.create({
      data: {
        UserEmail: email,
        UserPassword: hashPassword,
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
}

module.exports = new UserService();
