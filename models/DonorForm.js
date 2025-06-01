const mongoose = require("mongoose"); 

const donorProfileInfo = new mongoose.Schema( {

  firstname: { type: String, required: true },
  lastname: {type: String, required: true}, 
  email: {type: String, required: true}, 
  phone: {type: String, required: true}, 
  email: { type: String, required: true, unique: true }, 
  address: {type: String, required: true}, 
  city : {type: String, required: true}, 
  state: {type: String, required: false}, 
  zipcode : {type: String, required: false}

})

module.exports = mongoose.model('DonorInfo', donorProfileInfo); 
