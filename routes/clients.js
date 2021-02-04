const express = require('express');
const router = express.Router();
const {getAllClients, getOneClient, createClient, updateClient} = require('../controllers/clients');

router.get('/', getAllClients)
router.get('/:id', getOneClient)
router.post('/', createClient)
router.put('/:id', updateClient)
router.delete('/:id')

module.exports = router;