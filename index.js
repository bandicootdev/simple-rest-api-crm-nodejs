const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('db is connect'))
  .catch(err => {
    console.log(err)
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', routes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({ok: false, error: err.message});
});

app.listen(3000, () => {
  console.log('server on port 3000')
})