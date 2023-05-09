const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();

class commentsController {
  async postComment(req, res, next) {
    try {
      let { productID, body } = req.body;
      let userId = req.cookies.userID;
      const addedComment = await conn.comments.create({
        data: {
          CommentProductID: Number.parseInt(productID),
          CommentUserID: Number.parseInt(userId),
          Comment: body,
        },
      });
      res.status(200).json({ addedComment });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getComments(req, res) {
    try {
      let productID = req.params.id;
      const comments = await conn.comments.findMany({
        where: {
          CommentProductID: Number.parseInt(productID),
        },
        include: {
          users: {
            select: {
              UserEmail: true,
            },
          },
        },
      });
      res.status(200).json({ comments });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}

module.exports = new commentsController();
