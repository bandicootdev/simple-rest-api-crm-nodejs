const Orders = require('../models/Orders');


module.exports.getAllOrders = async (req, res, next) => {
  try {
    let orders = await Orders.find({})
      .populate('client')
      .populate({
        path: 'products.product',
        model: 'Products'
      })
      .catch(err => {
        throw err
      })
    if (!orders) {
      return res.status(204).json({ok: false, message: 'no existing orders'})
    }
    res.status(200).json({ok: true, orders})
  } catch (err) {
    next(err)
  }
}

module.exports.getOneOrder = async (req, res, next) => {
  try {
    const {id} = req.params;
    let order = await Orders.findById(id).catch(err => {
      throw err
    })
    if (!order) {
      return res.status(204).json({ok: false, message: 'Order not found'})
    }
    res.status(200).json({ok: true, order})
  } catch (err) {
    next(err)
  }
}

module.exports.createOrder = async (req, res, next) => {
  try {
    const {client, products} = req.body;
    if (!client || !products) {
      return res.status(400).json({ok: false, message: 'required fields'});
    }
    const order = new Orders({
      client,
      products
    })
    await order.save().catch(err => {
      throw err
    })
    res.status(200).json({ok: true, message: 'Order created successfully'});
  } catch (err) {
    next(err)
  }
}

