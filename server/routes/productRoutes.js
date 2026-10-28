const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filtering, sorting, pagination
router.get('/', async (req, res) => {
  try {
    const { category, collectionName, search, sort, minPrice, maxPrice } = req.query;
    let query = {};

    if (category) query.category = category;
    if (collectionName) query.collectionName = collectionName;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'price-low') sortOption.price = 1;
    else if (sort === 'price-high') sortOption.price = -1;
    else if (sort === 'newest') sortOption.createdAt = -1;
    else sortOption.isFeatured = -1; // Default featured

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
