const Product = require('../models/Product');

// Get all products (Filters, Sort, Search built-in)
const getProducts = async (req, res, next) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    let apiQuery = Product.find(query);

    // Sorting Logic
    if (sort === 'low') apiQuery = apiQuery.sort({ price: 1 });
    else if (sort === 'high') apiQuery = apiQuery.sort({ price: -1 });
    else apiQuery = apiQuery.sort({ createdAt: -1 }); // default newest items

    const products = await Product.find(query).merge(apiQuery);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// ADMIN: Create New Product
const createProduct = async (req, res, next) => {
  try {
    const { title, description, category, price, imageUrl, stockStatus } = req.body;
    const product = new Product({ title, description, category, price: Number(price), imageUrl, stockStatus: stockStatus || 'In Stock' });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// ADMIN: Delete Product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }
    await product.deleteOne();
    res.json({ message: 'Product successfully removed from database' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct, deleteProduct };