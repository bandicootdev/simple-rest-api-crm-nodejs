const express = require('express');
const router = express.Router();

/* initial route */
router.get('/', (req, res) => {
  res.status(200).json({ok: true, message: 'ok'})
})

/* routes not found */
router.get('*', (req, res) => res.status(404).json({ok: false, message: 'Not Found'}))
router.post('*', (req, res) => res.status(404).json({ok: false, message: 'Not Found'}))
router.put('*', (req, res) => res.status(404).json({ok: false, message: 'Not Found'}))
router.delete('*', (req, res) => res.status(404).json({ok: false, message: 'Not Found'}))
module.exports = router;