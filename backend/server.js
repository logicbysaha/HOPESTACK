// server.js — The main entry point for our backend server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config(); // Loads secret keys from .env file

const app = express();

// Middleware: allows our server to understand JSON and talk to frontend
app.use(helmet({
  contentSecurityPolicy: false, // Turn off CSP for simpler development (React-friendly)
}));
app.use(compression());
app.use(cors());
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ DB Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/journal', require('./routes/journal'));

// Serve static files from the React frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// Start the server on a dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));