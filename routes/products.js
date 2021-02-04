const express = require('express');
const {uploadImage} = require("../utils/functions");
const router = express.Router();
const {createProduct} = require('../controllers/products');

router.get('/',)
router.get('/:id',)
router.post('/', [uploadImage, createProduct])
router.put('/:id',)
router.delete('/:id',)

module.exports = router;