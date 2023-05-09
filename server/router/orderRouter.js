const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");

router.get("/getByID/:orderID", orderController.getOrderByID);
router.get("/", orderController.getUserOrders);
router.get("/delivery/getAll", orderController.getAllOrders);
router.get("/pay/:orderID", orderController.payForOrder);
router.put("/delivery/:orderID/:status", orderController.changeStatus);

module.exports = router;
