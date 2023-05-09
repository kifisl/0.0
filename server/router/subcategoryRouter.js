const Router = require("express");
const router = new Router();
const subcategoryController = require("../controllers/subcategoryController");
const checkRole = require("../middlewares/role-middleware");

router.get("/", subcategoryController.getSubCategory);
router.post("/add", checkRole(1), subcategoryController.addSubCategory);
router.get("/:id", subcategoryController.getSubCategoryByID);
router.put("/edit", checkRole(1), subcategoryController.edit);
router.delete("/", checkRole(1), subcategoryController.delete);

module.exports = router;
