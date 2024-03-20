const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const authController = require('../Controller/auth');

router.get('/login', authController.getLogin);
router.post('/login', [
    body('email').isEmail().withMessage('Please Enter A Valid Email'),
    body('password', 'Password must be of atleast 6 characters').isLength({ min: 6 }).isAlphanumeric()
],
    authController.postLogin);

router.get('/signup', authController.getSignUp);

router.post('/signup', [
    body('firstName').custom((value) => {
        if (value === '') {
            throw new Error('Please enter your first name')
        }
        return true;
    }),
    body('lastName').custom((value) => {
        if (value === '') {
            throw new Error('Please enter your last name')
        }
        return true;
    }), body('email').isEmail().withMessage('Please enter a valid email'),

    body('password', 'Password must be of atleast 6 characters').isLength({ min: 6 }).isAlphanumeric(),
    body('confirmPassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords Have To Match');
        }
        return true;
    })
], authController.postSignUp);

router.post('/logout', authController.postLogOut);

exports.router = router;