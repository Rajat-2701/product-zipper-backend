const asyncHandler = require("express-async-handler");
const Product = require("../models/products.model");

// create proudct api:

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { title, brand, category, price } = req.body;

    var product = new Product({
      title,
      brand,
      category,
      price,
    });
    const product_data = await product.save();
    res.status(200).send({
      success: true,
      message: "Product added successfully",
      data: product_data,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = createProduct;
