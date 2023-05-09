const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const checkRole = require("../middlewares/role-middleware");

router.get("/getByID/:orderID", orderController.getOrderByID);
router.get("/", orderController.getUserOrders);
router.get("/delivery/getAll", checkRole(2), orderController.getAllOrders);
router.get("/pay/:orderID", orderController.payForOrder);
router.put(
  "/delivery/:orderID/:status",
  checkRole(2),
  orderController.changeStatus
);

module.exports = router;
