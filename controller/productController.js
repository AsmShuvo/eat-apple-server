const productModel = require("../model/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, image, description, price, rating } = req.body;
    const product = await productModel.create(req.body);
    res.status(201).json({
      message: "Product created successfully",
      product: { product },
    });
  } catch (error) {
    res.status(500).send({
      message: "Error during product creation",
    });
  }
};

module.exports = { createProduct };
