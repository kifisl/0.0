class userModel {
  getUserByEmail(conn, email) {
    const result = conn.users.findUnique({
      where: { UserEmail: email },
    });
    console.log(result.UserPassword);
    return result.UserPassword;
  }
}

module.exports = userModel;
