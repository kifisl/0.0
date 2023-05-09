const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");
const checkRole = require("../middlewares/role-middleware");

router.get("/", categoryController.getCategories);
router.post("/add", checkRole(1), categoryController.addCategory);
router.get("/getById/:id", categoryController.getCategoryByID);
router.put("/edit", checkRole(1), categoryController.editCategory);
router.delete("/", checkRole(1), categoryController.deleteCategory);

module.exports = router;
