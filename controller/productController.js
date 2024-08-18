const productModel = require("../model/productModel");
const { ObjectId } = require("mongodb");

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

const showAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, search = "", category = "" } = req.query;
    const skip = (page - 1) * limit;

    // Build the search query
    let searchQuery = {};
    if (search) {
      searchQuery.name = new RegExp(search, "i");
    }
    if (category) {
      searchQuery.category = category;
    }

    // Get the filtered and paginated products
    const products = await productModel
      .find(searchQuery)
      .skip(skip)
      .limit(parseInt(limit));
      
    const totalProducts = await productModel.countDocuments(searchQuery);

    res.status(200).json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
      products,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error getting products",
    });
  }
};


const showProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid product ID" });
    }

    // Find the product by _id
    const product = await productModel.findOne({ _id: new ObjectId(id) });
    // console.log("#",product)
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ product });
  } catch (error) {
    res.status(500).send({
      message: "Error getting product",
    });
  }
};

module.exports = { createProduct, showAllProducts, showProduct };

