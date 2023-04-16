const Router = require("express").Router;
const userController = require("../controllers/userController");
const UserController = require("../controllers/userController");
const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate", userController.activate);
router.get("/refresh", userController.activate);
router.get("/users", userController.getUsers);

module.exports = router;
