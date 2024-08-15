const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { ensureAuthenticated } = require('../middleware/auth'); // Import the middleware

const router = express.Router();

// Render login page
router.get('/login', (req, res) => {
  res.render('layout', { 
    title: 'Login', 
    user: req.user, 
    body: `
      <h1>Login</h1>
      <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" required>
        
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>
        
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a>.</p>
    `
  });
});

// Render registration page
router.get('/register', (req, res) => {
  res.render('layout', { 
    title: 'Register', 
    user: req.user, 
    body: `
      <h1>Register</h1>
      <form action="/register" method="POST">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" required>
        
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>
        
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a>.</p>
    `
  });
});

// Handle registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  
  res.redirect('/login');
});

// Handle login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirect to dashboard after successful login
  failureRedirect: '/login',
}));

// Handle logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { title: 'Dashboard', user: req.user });
});


module.exports = router;
