const Products = require('../models/Products');

module.exports.getAllProducts = async (req, res, next) => {
  try {
    let products = await Products.find({}).catch(err => {
      throw err
    })
    if (products.length === 0) {
      return res.status(204).json({ok: true, message: 'There are no products'});
    }
    res.status(200).json({ok: true, products})
  } catch (err) {
    next(err)
  }
}

module.exports.getOneProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    let product = await Products.findById(id).catch(err => {
      throw err
    })
    if (!product) {
      return res.status(204).json({ok: true, message: 'non-existent product'})
    }
    res.status(200).json({ok: true, product})
  } catch (err) {
    next(err)
  }
}

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
    next(err)
  }
}

module.exports.updateProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    let dataProduct = req.body;
    if (Object.keys(dataProduct).length === 0) {
      return res.status(400).json({ok: false, message: 'Required fields'})
    }

    let product = await Products.findById(id).catch(err => {
      throw err
    })
    if (req.file) {
      dataProduct.image = req.file.filename;
    } else {
      dataProduct.image = product.image;
    }

    let updatedProduct = await Products.findByIdAndUpdate({_id: id},
      dataProduct,
      {new: true}
    ).catch(err => {
      throw err
    });

    res.status(200).json({ok: true, product: updatedProduct});
  } catch
    (err) {
    next(err)
  }
}