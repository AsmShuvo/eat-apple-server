const express = require("express");
const {
  createProduct,
  showAllProducts,
  showProduct,
} = require("../controller/productController");
const router = express.Router();

router.post("/create-product", createProduct);
router.get("/show-product", showAllProducts);
router.get("/show-product/:id", showProduct);

module.exports = router;
