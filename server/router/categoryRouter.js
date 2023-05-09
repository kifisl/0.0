const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);
router.post("/add", categoryController.addCategory);
router.get("/getById/:id", categoryController.getCategoryByID);
router.put("/edit", categoryController.editCategory);
router.delete("/", categoryController.deleteCategory);

module.exports = router;
