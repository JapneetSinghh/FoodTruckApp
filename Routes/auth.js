const express = require('express');
const router = express.Router();
router.get('/login',(req,res,next)=>{
    console.log('Welcome to login page');
    res.render('authentication/login',{
        pageTitle:"Login | Taste On Wheels"
    })
})

router.get('/signup',(req,res,next)=>{
    console.log('Welcome to sign up page');
    res.render('authentication/signup',{
        pageTitle:"Sign Up | Taste On Wheels"
    })
})

exports.router = router;