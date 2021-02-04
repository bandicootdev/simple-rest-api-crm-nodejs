const express = require('express');
const app = express();
const clients = require('./clients');
const products = require('./products');
/* initial route */
app.get('/', (req, res) => {
  res.status(200).json({ok: true, message: 'ok'})
})

app.use('/clients', clients)
app.use('/products', products)

/* routes not found */
app.get('*', (req, res) => res.status(404).json({ok: false, message: 'Not Found'}))
app.post('*', (req, res) => res.status(404).json({ok: false, message: 'Not Found'}))
app.put('*', (req, res) => res.status(404).json({ok: false, message: 'Not Found'}))
app.delete('*', (req, res) => res.status(404).json({ok: false, message: 'Not Found'}))
module.exports = app;