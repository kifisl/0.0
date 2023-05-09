const Router = require("express");
const router = new Router();
const multer = require("multer");
const productController = require("../controllers/productController");
var storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });
router.post("/add", productController.addProduct);
router.post("/", productController.getProducts);
router.post("/getById", productController.getProductByID);
router.post("/edit", upload.single("file"), productController.editProduct);
router.post("/getPag", productController.getPagination);

module.exports = router;
