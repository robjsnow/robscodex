const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: req.user });
});


module.exports = router;