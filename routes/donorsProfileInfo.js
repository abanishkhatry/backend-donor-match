const express = require('express');
const router = express.Router();
const Donor = require('../models/DonorForm')

router.post('/', async (req,res) =>{

    try {
    console.log(req.body)    ;
    const { 
        firstname, 
        lastname, 
        bloodType,
        email, 
        phone, 
        address, 
        city, 
        state, 
        zipcode 
         } = req.body;

    const newDonor = new Donor( {
        firstname, 
        lastname, 
        bloodType,
        email, 
        phone, 
        address, 
        city, 
        state, 
        zipcode 
    }   ); 
    
    await newDonor.save();

    res.status(201).json({ message: "Donor registered successfully!" });
    
    }
    catch (error) {
    console.error("Donor save error:", error);
    res.status(500).json({ message: "Server error" });
    }

}); 

module.exports = router;