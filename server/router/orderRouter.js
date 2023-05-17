const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const checkRole = require("../middlewares/role-middleware");
const paymentController = require("../controllers/paymentController");

router.post("/getByID", orderController.getOrderByID);
router.get("/", orderController.getUserOrders);
router.get("/delivery/getAll", orderController.getAllOrders);
router.post("/pay", paymentController.createOrder);
router.put("/delivery/:orderID/:status", orderController.changeStatus);
router.post("/webhook", orderController.webhook);

module.exports = router;
