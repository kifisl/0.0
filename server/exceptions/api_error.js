module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnathorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static Internal(message, errors = []) {
    return new ApiError(500, message, errors);
  }

  static forbidden(message, errors = []) {
    return new ApiError(503, message, errors);
  }
};
