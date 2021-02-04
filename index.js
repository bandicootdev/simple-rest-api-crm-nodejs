const express = require('express')
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('db is connect'))
  .catch(err => {
  console.log(err)
})

app.use('/', routes);

app.listen(3000, () => {
  console.log('server on port 3000')
})