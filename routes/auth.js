//  Imports Express, the backend web framework used to define routes like /signup and /login.
const express = require('express');
// Creates a router object to define separate route handlers like: router.post('/signup', ...) , router.post('/login', ...)
const router = express.Router();
// Imports bcryptjs, a library for hashing passwords securely.
// This is important for securely storing user passwords in the database.
const bcrypt = require('bcryptjs');
// Imports jsonwebtoken, a library for creating and verifying JSON Web Tokens (JWT).
const jwt = require('jsonwebtoken');
// Imports the User model, which is used to interact with the users collection in the MongoDB database.
const User = require('../models/User');
// Imports the authentication middleware, which checks if a user is authenticated before allowing access to certain routes.
const auth = require('../middleware/auth');

// Signup route
// Defines a POST route at /api/auth/signup. It will run when the frontend sends a signup request.
router.post('/signup', async (req, res) => {
    // Extracts the name, email, and password from the request body. This is the user input.
  const { name, email, password } = req.body;

  try {
    // Checks if the user already exists in the database by searching for the email.
    let user = await User.findOne({ email });
    //  If the email is already used, return a 400 Bad Request error with a message.
    if (user) return res.status(400).json({ msg: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    // Hashes the password using bcrypt with a salt to make it more secure.
    const hashedPassword = await bcrypt.hash(password, salt);
    // Creates a new user object with the name, email, and hashed password.
    // This object will be saved to the database.
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    // Generates a JWT token for the user. This token will be used for authentication in future requests.
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Sends a JSON response to the client with the token and user information (excluding the password).
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    // If there's an error (like a database error), log it and send a 500 Internal Server Error response.
    res.status(500).send('Server error');
  }
});


// Login route
// Defines a POST route at /api/auth/login. It will run when the frontend sends a login request.
router.post('/login', async (req, res) => {
    // Extracts the email and password from the request body. This is the user input.
  const { email, password } = req.body;
  try {
    // Checks if the user exists in the database by searching for the email.
    const user = await User.findOne({ email });
    // If the user is not found, return a 400 Bad Request error with a message.
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compares the provided password with the hashed password stored in the database.
    // This is done using bcrypt's compare function, which checks if the password matches the hash.
    const isMatch = await bcrypt.compare(password, user.password);
    // If the password doesn't match, return a 400 Bad Request error with a message.
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    // If the password matches, generate a JWT token for the user.
    // This token will be used for authentication in future requests.
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Sends a JSON response to the client with the token and user information (excluding the password).
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Protect a route
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password'); // remove password field
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
  });

// Exports the router object so it can be used in other files, like server.js.
module.exports = router;
