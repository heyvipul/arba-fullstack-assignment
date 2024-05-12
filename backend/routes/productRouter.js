const express = require('express');
const router = express.Router();
const Product = require("../models/Product");


router.post('/', async (req, res) => {
  try {
    let { avatar, title, description, Price } = req.body;
    
    if (!avatar) {
      avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-YwrVVjOv028wj9HZ_0_GUizZdQhoxB_C2Q_0yfYgA&s";
    }
    const product = new Product({ avatar, title, description, Price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
