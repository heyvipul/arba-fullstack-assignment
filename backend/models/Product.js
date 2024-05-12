const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',

  },
  avatar: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-YwrVVjOv028wj9HZ_0_GUizZdQhoxB_C2Q_0yfYgA&s"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

  }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
