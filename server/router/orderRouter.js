const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const checkRole = require("../middlewares/role-middleware");
const paymentController = require("../controllers/paymentController");

router.get("/getByID/:orderID", orderController.getOrderByID);
router.get("/", orderController.getUserOrders);
router.get("/delivery/getAll", checkRole(2), orderController.getAllOrders);
router.post("/pay", paymentController.createOrder);
router.put(
  "/delivery/:orderID/:status",
  checkRole(2),
  orderController.changeStatus
);
router.post("/webhook", orderController.webhook);

module.exports = router;
