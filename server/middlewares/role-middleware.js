const { decode } = require("jsonwebtoken");
const ApiError = require("../exceptions/api_error");
const tokenService = require("../service/tokenService");

module.exports = function (role) {
  return function (req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        console.log("1");
        return next(ApiError.UnathorizedError());
      }

      const refreshToken = authorizationHeader.split(" ")[1];
      if (!refreshToken) {
        console.log("2");
        return next(ApiError.UnathorizedError());
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      if (!userData) {
        console.log("3");
        return next(ApiError.UnathorizedError());
      }

      if (userData.role != role) {
        console.log("5");
        return next(ApiError.NoAccess());
      }

      req.user = userData;
      next();
    } catch (e) {
      console.log("4");
      return next(ApiError.UnathorizedError());
    }
  };
};
