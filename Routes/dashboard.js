const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res, next) => {
    console.log('req.session.isLoggedIn:', req.session.isLoggedIn)
    if (req.session.isLoggedIn) {
        res.render('dashboard/dashboard', {
            pageTitle: 'Dashboard'
        })
    } else {
        res.redirect('/login');
        console.log('Login to use dashboard')
    }
})
router.get('/addFoodTruck', (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.render('dashboard/addFoodTruck', {
            pageTitle: 'Dashboard'
        })
    } else {
        res.redirect('/login');
        console.log('Login to use dashboard')
    }
})

exports.router = router;