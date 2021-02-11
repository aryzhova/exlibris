const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }, 
  year: Number,
  imageUrl: String,
  description: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    required: true
  },
  borrowedBy: String,
  queue: {
    users: [
      {
        user: {type: Object}
      }
    ]
  }
});

module.exports = mongoose.model('Book', bookSchema);