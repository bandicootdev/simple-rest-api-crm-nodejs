const express = require('express');
const router = express.Router();

const {getAllOrders,getOneOrder,createOrder} = require('../controllers/Orders');

router.get('/',getAllOrders)
router.get('/:id',getOneOrder)
router.post('/', createOrder)
router.put('/:id',)
router.delete('/:id',)

module.exports = router;