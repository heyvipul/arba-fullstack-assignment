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
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    
  },
  image: {
    type: String,
  
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 
  }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
