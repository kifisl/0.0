const { decode } = require("jsonwebtoken");
const ApiError = require("../exceptions/api_error");
const tokenService = require("../service/tokenService");

module.exports = function (role) {
  return function (req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return next(ApiError.UnathorizedError());
      }

      const refreshToken = authorizationHeader.split(" ")[1];
      if (!refreshToken) {
        return next(ApiError.UnathorizedError());
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      if (!userData) {
        return next(ApiError.UnathorizedError());
      }

      if (userData.role != role) {
        return next(ApiError.NoAccess());
      }

      req.user = userData;
      next();
    } catch (e) {
      return next(ApiError.UnathorizedError());
    }
  };
};
