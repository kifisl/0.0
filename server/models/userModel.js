class userModel {
  getUserByEmail(conn, email) {
    const result = conn.users.findUnique({
      where: { UserEmail: email },
    });
    return result.UserPassword;
  }
}

module.exports = userModel;
