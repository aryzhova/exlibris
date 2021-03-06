const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const roles = {
  ADMIN: "admin",
  READER: "reader"
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpire: Date,
  role: {
    type: roles,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);