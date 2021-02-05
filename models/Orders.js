const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Clients'
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Products'
    },
    quantity: Number
  }],
  total: {
    type: Number
  }
})

module.exports = mongoose.model('Orders', OrderSchema)