const express = require("express");
const {
  createProduct,
  showAllProducts,
} = require("../controller/productController");
const router = express.Router();

router.post("/create-product", createProduct);
router.get("/show-product", showAllProducts);

module.exports = router;
