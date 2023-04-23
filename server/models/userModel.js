class userModel {
  getUserByEmail(conn, email) {
    return conn.users.findUnique({
      where: { UserEmail: email },
    });
  }
}

module.exports = userModel;
