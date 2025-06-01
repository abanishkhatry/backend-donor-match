const express = require('express');
const router = express.Router();

const slogans = [
    "Donate Blood save lifes" , 
    "Your blood can give someone another chance at life.",
    "Be a hero — donate blood.",
    "Every drop counts.",
    "Be the reason someone lives today.",
    "It only takes a few minutes to save a life.", 
    "Rakta dan Jeewan Dan"
]

router.get('/', (req, res)=>{
    const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
    res.json({slogan : randomSlogan});
}); 

module.exports = router; 
 
