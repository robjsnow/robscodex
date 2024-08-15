const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const postRoutes = require('./routes/posts'); 
const authRoutes = require('./routes/auth'); // Add the auth routes
const { setupGlobalMiddleware } = require('./middlewares');
const indexRoutes = require('./routes/index'); 
require('./config/passport')(passport); // Configure Passport

dotenv.config();

const app = express();

// Apply global middleware
setupGlobalMiddleware(app);

// Set up Express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/', indexRoutes); // Home page route
app.use('/', authRoutes); // Authentication routes
app.use('/', postRoutes); // Blog post routes

module.exports = app; // Export app without starting the server
