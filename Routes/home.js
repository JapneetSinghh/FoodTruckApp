const express = require('express');
const router = express.Router();
router.get('/',(req,res,next)=>{
    console.log('Welcome to home page');
    res.render('index',{
        pageTitle:"Cleaning Services"
    })
})

exports.router = router;