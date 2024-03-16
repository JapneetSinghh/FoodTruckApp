const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('Welcome to home page');
    res.render('index',{
        pageTitle:"Taste On Wheels"
    })
})


router.get('/foodTrucks',(req,res,next)=>{
    console.log('Welcome to food truck page');
    res.render('foodtruck',{
        pageTitle:"Food Truck | Taste On Wheels"
    })
})

exports.router = router;