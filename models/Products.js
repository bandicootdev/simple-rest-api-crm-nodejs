const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  price: {
    type: Number
  },
  image: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Products', ProductsSchema);