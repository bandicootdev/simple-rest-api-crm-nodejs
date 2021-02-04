const express = require('express');
const router = express.Router();
const {getAllClients,createClient} = require('../controllers/clients');

router.get('/',getAllClients)
router.get('/:id')
router.post('/', createClient)
router.put('/:id')
router.delete('/:id')

module.exports = router;