const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Seed sample data
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const sampleProducts = [
      {
        name: 'Vintage Leather Backpack',
        price: 89.99,
        category: 'Accessories',
        description: 'Durable, stylish travel companion.',
        variants: [
          { color: 'Brown', size: 'M', stock: 25 },
          { color: 'Black', size: 'M', stock: 15 },
          { color: 'Tan', size: 'M', stock: 5 }
        ]
      },
      {
        name: '4K Ultra HD Monitor',
        price: 349.00,
        category: 'Electronics',
        description: 'Vibrant colors and fast refresh rate.',
        variants: [
          { color: 'Dark Gray', size: 'One Size', stock: 40 }
        ]
      },
      {
        name: 'Summer Linen Shirt',
        price: 35.50,
        category: 'Apparel',
        variants: [
          { color: 'White', size: 'S', stock: 30 },
          { color: 'White', size: 'M', stock: 22 },
          { color: 'Navy', size: 'L', stock: 18 }
        ]
      }
    ];
    const inserted = await Product.insertMany(sampleProducts);
    res.status(201).json({ status: 'success', message: `${inserted.length} products inserted.` });
  } catch (error) {
    res.status(500).json({ error: `Seeding error: ${error.message}` });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: `Fetch error: ${error.message}` });
  }
});

// Filter by category
router.get('/filter', async (req, res) => {
  const { category } = req.query;   // 🔹 changed from cat → category
  if (!category) return res.status(400).json({ message: 'Query parameter "category" is required.' });
  try {
    const products = await Product.find({ category }).select('name price category variants');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: `Filter error: ${error.message}` });
  }
});

// Get variants by color
router.get('/variants/:color', async (req, res) => {
  const { color } = req.params;
  try {
    const result = await Product.aggregate([
      { $unwind: '$variants' },
      { $match: { 'variants.color': { $regex: new RegExp(color, "i") } } }, // 🔹 case-insensitive
      { $project: { _id: 0, product: '$name', price: '$price', variant: '$variants' } }
    ]);
    if (!result.length) return res.status(404).json({ message: `No variants found for color: ${color}` });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Aggregation error: ${error.message}` });
  }
});

module.exports = router;
