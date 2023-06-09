const userService = require("../service/userService");
const UserService = require("../service/userService");
require("dotenv").config();
const express = require("express");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api_error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("userID", userData.user.id);
      return res.json(userData);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("userID", userData.user.id);
      return res.json(userData);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.clearCookie("userID");
      return res.json(token);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("userID", userData.user.id);
      return res.json(userData);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }

  async getByID(req, res, next) {
    try {
      let userID = req.cookies.userID;
      const user = await userService.getUserByID(userID);
      return res.json(user);
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  }
}

module.exports = new UserController();
