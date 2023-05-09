const Router = require("express");
const router = new Router();
const commentsController = require("../controllers/commentsController");

router.post("/", commentsController.postComment);
router.get("/:id", commentsController.getComments);

module.exports = router;
