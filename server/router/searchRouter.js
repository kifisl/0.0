const Router = require("express");
const router = new Router();
const searchController = require("../controllers/searchController");

router.get("/", searchController.testGet);
router.get("/byName", searchController.searchByName);
router.get("/allCategories", searchController.findAllCategories);
router.get("/allSubcategories", searchController.findAllSubcategories);
router.post("/subcategoriesByCategory", searchController.refreshSubcategories);
router.post("/productsByCategory", searchController.findProductsByCategory);
router.post(
  "/productsBySubcategory",
  searchController.findProductsBySubCategory
);

module.exports = router;
