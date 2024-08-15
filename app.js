const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts'); 
const { setupGlobalMiddleware } = require('./middlewares');

dotenv.config();

const app = express();

// Apply global middleware
setupGlobalMiddleware(app);

mongoose.connect(process.env.MONGODB_URI, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/', postRoutes);

module.exports = app; // Export app without starting the server
