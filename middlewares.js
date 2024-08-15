const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const express = require('express');

function setupGlobalMiddleware(app) {
  // Parse JSON data
  app.use(bodyParser.json());

  // Parse URL-encoded data
  app.use(bodyParser.urlencoded({ extended: true }));

  // Handle HTTP method overrides
  app.use(methodOverride('_method'));

  // Serve static files
  app.use(express.static('public'));
  
  // Set view engine
  app.set('view engine', 'ejs');
}

function setupRouteSpecificMiddleware(app) {
  // Route-specific middleware to be set here
}

module.exports = { setupGlobalMiddleware, setupRouteSpecificMiddleware };
