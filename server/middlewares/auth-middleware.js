const ApiError = require("../exceptions/api_error");
const tokenService = require("../service/tokenService");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      console.log("1");
      return next(ApiError.UnathorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      console.log("2");
      return next(ApiError.UnathorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    console.log(`${accessToken} middle`);
    if (!userData) {
      console.log("3");
      return next(ApiError.UnathorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    console.log("4");
    return next(ApiError.UnathorizedError());
  }
};
