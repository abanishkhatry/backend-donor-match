// This imports the Mongoose library so you can define a schema and interact with MongoDB using JavaScript objects. 
const mongoose = require('mongoose');
// This creates a new schema for the User model. A schema defines the structure of documents within a collection in MongoDB.
// In this case, the User schema has three fields: name, email, and password.
// Each field has a type and some have additional constraints (like required: true means mandatory and unique).
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
//Exports a Mongoose model called 'User' based on the UserSchema
// This model can be used to create, read, update, and delete user documents in the MongoDB database.
module.exports = mongoose.model('User', UserSchema);
