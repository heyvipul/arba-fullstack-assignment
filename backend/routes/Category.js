const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', getCategory, (req, res) => {
  res.json(res.category);
});


router.delete('/:id', getCategory, async (req, res) => {
  try {
    await res.category.remove();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.category = category;
  next();
}

module.exports = router;
