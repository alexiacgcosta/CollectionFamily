const mongoose = require('mongoose');
const conn = require('../../config/mongo');

conn();
const userSchema = mongoose.Schema({
  nome: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel