const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


router.post('/', async (req, res) => {
  try {
    const { name, slug, avatar, owner } = req.body;

    let data = await Category_Model({ name, slug, avatar, owner });
    await data.save();
    res.status(201).send({ msg: "New category has been created", data: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
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
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete('/:id', getCategory, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Category.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: "Category not found" });
    }
    if (data.userID !== req.body.userID) {
      return res.status(403).send({ error: "Not authorized" });
    }
    await Category.findByIdAndDelete(id);
    res.status(200).send({ msg: `Category has been deleted` });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
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
