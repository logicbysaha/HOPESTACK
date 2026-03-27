// models/Journal.js — Blueprint for each journal entry
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,  // Links entry to a specific user
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    required: true  // The journal entry text
  },
  sentimentScore: { 
    type: Number,   // A number between -1 (very sad) and +1 (very happy)
    required: true 
  },
  sentimentLabel: {
    type: String,   // "positive", "negative", or "neutral"
    enum: ['positive', 'negative', 'neutral']
  },
  lang: {
    type: String,   // 'en', 'hi', or 'bn'
    default: 'en'
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Journal', journalSchema);