const Products = require('../models/Products');

module.exports.createProduct = async (req, res, next) => {
  try {
    const {name, price} = req.body;

    if (!name || !price) {
      return res.status(400).json({ok: false, message: 'Required fields'})
    }

    const product = new Products({name, price});

    if (req.file) {
      product.image = req.file.filename;
    }

    await product.save().catch(err => {
      throw err
    })

    res.status(200).json({ok: false, message: 'Product created successfully'})
  } catch (err) {
    throw err
  }
}