// Imports Express, the backend web framework used to define routes like /signup and /login.
const express = require('express');
// Imports CORS, a middleware that allows cross-origin requests, which is useful for APIs.
// This is important when your frontend and backend are hosted on different domains or ports.
// This is important for security and to allow your frontend to communicate with your backend.
const cors = require('cors');
// Imports dotenv, a module that loads environment variables from a .env file into process.env.
// This is useful for storing sensitive information like database connection strings and API keys.
const dotenv = require('dotenv');
// Imports the database connection function from config/db.js.
// This function establishes a connection to the MongoDB database using Mongoose.
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();
// Connect to the database
// This calls the connectDB function to establish a connection to the MongoDB database.
connectDB();
// Create an Express application
// This initializes an Express application, which will be used to define routes and middleware.
const app = express();
// This uses the CORS middleware to allow cross-origin requests.
app.use(cors());
// This middleware parses incoming JSON requests and makes the data available in req.body.
app.use(express.json());

// This imports the authentication routes from routes/auth.js.
// These routes handle user signup and login requests.
app.use('/api/auth', require('./routes/auth'));

// This imports the donor routes from routes/donors.js.
const PORT = process.env.PORT || 5000;

// Start the server
// This starts the Express server and listens for incoming requests on the specified port.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
