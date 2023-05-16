const Router = require("express");
const router = new Router();
const multer = require("multer");
const productController = require("../controllers/productController");
const checkRole = require("../middlewares/role-middleware");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("file"), productController.addProduct);
router.post("/", productController.getProducts);
router.post("/getById", productController.getProductByID);
router.post("/edit", upload.single("file"), productController.editProduct);
router.post("/getPag", productController.getPagination);
router.delete("/delete", productController.deleteProduct);

module.exports = router;
