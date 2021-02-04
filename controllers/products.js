const Products = require('../models/Products');
const {removeImage} = require("../utils/functions");
const {fileExists} = require("../utils/functions");

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

    res.status(200).json({ok: true, message: 'Product created successfully'})
  } catch (err) {
    next(err)
  }
}

module.exports.updateProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    let dataProduct = req.body;

    let product = await Products.findById(id).catch(err => {
      throw err
    })

    if (req.file) {
      if (product.image) {
        let fExist = await fileExists(product.image).catch(err => {
          throw err
        })
        if (fExist === true) {
          let fRemove = await removeImage(product.image).catch(err => {
            throw err
          })
          if (fRemove === true) {
            dataProduct.image = req.file.filename;
          }
        }
      } else {
        dataProduct.image = req.file.filename;
      }
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
  } catch (err) {
    if (req.file) await removeImage(req.file.filename).catch(err => {
      next(err)
    })
    if (err.message.split(':')[1].split(',')[0].trim() === 'no such file or directory') {
      return res.status(400).json({ok: false, message: 'image not found'})
    }
    next(err)
  }
}

module.exports.destroyProduct = async (req, res, next) => {
  try {
    const {id} = req.params;
    let product = await Products.findById(id).catch(err => {
      throw err
    })
    if (!product) {
      return res.status(400).json({ok: false, message: 'non-existent product'})
    }

    if (product[`image`]) {
      const fExist = await fileExists(product[`image`]).catch(err => {
        throw err
      })
      if (fExist === true) {
        const fRemove = await removeImage(product[`image`]).catch(err => {
          throw err
        })
        if (fRemove === true) {
          await Products.findByIdAndDelete({_id: id}).catch(err => {
            throw err
          })
        }
      }
    } else {
      await Products.findByIdAndDelete({_id: id}).catch(err => {
        throw err
      })
    }

    res.status(200).json({ok: true, message: 'Product removed successfully'})
  } catch (err) {
    next(err)
  }
}