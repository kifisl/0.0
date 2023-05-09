const Router = require("express");
const router = new Router();
const subcategoryController = require("../controllers/subcategoryController");

router.get("/", subcategoryController.getSubCategory);
router.post("/add", subcategoryController.addSubCategory);
router.get("/:id", subcategoryController.getSubCategoryByID);
router.put("/edit", subcategoryController.edit);
router.delete("/", subcategoryController.delete);

module.exports = router;
