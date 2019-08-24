const mongoose = require('mongoose')
const assignments = require('./assignments')

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {type: Boolean, default: false},
  assignments: [assignments]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', schema)