const express = require('express');
const router = express.Router();
const {createClient} = require('../controllers/clients');

router.get('/')
router.get('/:id')
router.post('/', createClient)
router.put('/:id')
router.delete('/:id')

module.exports = router;