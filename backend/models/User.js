// models/User.js — Blueprint for storing user accounts
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true  // No two users can have the same email
  },
  password: { 
    type: String, 
    required: true  // Will be stored as encrypted hash, not plain text
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', userSchema);