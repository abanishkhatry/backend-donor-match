//This imports the Mongoose library, which is used to connect to MongoDB and define schemas/models in a structured way
const mongoose = require('mongoose');
// Defines an asynchronous function named connectDB. Using async allows us to wait for the database connection to finish before proceeding.
const connectDB = async () => {
  try {
    // Connects to the MongoDB database using the connection string stored in the environment variable MONGO_URI.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
// This exports the connectDB function so it can be used in other files, such as server.js.
// This allows the server to call connectDB to establish a connection to the database when it starts up.
module.exports = connectDB;
