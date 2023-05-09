module.exports = class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.UserEmail;
    this.id = model.UserID;
    this.isActivated = model.IsActivated;
    this.role = model.role;
  }
};
