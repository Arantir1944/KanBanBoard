// Import the Express framework
const express = require('express');

// Create an instance of the router
const router = express.Router();

// Import the 'users' module containing controller functions
const users = require('../controllers/users');

// Define routes for user registration
router.route('/register')
    .get(users.renderRegister) // Handle GET request to /register endpoint
    .post(users.registerUser); // Handle POST request to /register endpoint

// Define routes for user login
router.route('/login')
    .get(users.renderLogin) // Handle GET request to /login endpoint
    .post(users.loginUser); // Handle POST request to /login endpoint

// Define route for user logout
router.route('/logout')
    .get(users.logoutUser); // Handle GET request to /logout endpoint

// Export the router to be used in other parts of the application
module.exports = router;
