const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    min: 20,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  grade:{
    type: String,
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = schema