const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ClientsSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Clients', ClientsSchema);