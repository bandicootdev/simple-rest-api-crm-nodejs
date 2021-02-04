const express = require('express');
const {uploadImage} = require("../utils/functions");
const router = express.Router();
const {
  getAllProducts,
  getOneProduct,
  updateProduct,
  createProduct,
  destroyProduct
} = require('../controllers/products');

router.get('/', getAllProducts)
router.get('/:id', getOneProduct)
router.post('/', [uploadImage, createProduct])
router.put('/:id', [uploadImage, updateProduct])
router.delete('/:id', destroyProduct)

module.exports = router;