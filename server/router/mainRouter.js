const Router = require("express");
const router = new Router();

const authRouter = require("./authRouter");
const basketRouter = require("./basketRouter");
const subcategoryRouter = require("./subcategoryRouter");
const categoryRouter = require("./categoryRouter");
const orderRouter = require("./orderRouter");
const productRouter = require("./productRouter");
const commentsRouter = require("./commentsRouter");
const searchRouter = require("./searchRouter");

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/subcategory", subcategoryRouter);
router.use("/order", orderRouter);
router.use("/basket", basketRouter);
router.use("/product", productRouter);
router.use("/search", searchRouter);
router.use("/comments", commentsRouter);

module.exports = router;
