const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  address: Array,
  orderHistory: Array
})

const User = model('User', userSchema)

module.exports = { User }