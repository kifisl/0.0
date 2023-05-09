const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.post("/", basketController.addProductToBasket);
router.get("/", basketController.getProductsInBasket);
router.delete("/", basketController.removeItemFromBasket);
router.post("/basketToOrder", basketController.CreateOrder);
module.exports = router;
