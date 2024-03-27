const User = require('../Model/users.js');
const bcryptjs = require('bcryptjs');
// const { router } = require('../Routes/dashboard.js');
const { validationResult } = require('express-validator');

// Get Login
exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    let className = req.flash('className');

    console.log('Class Name: ', className)

    // Checking if there is any error
    if (message.length > 0) {
        message = message[0];
        console.log('Error Message: ', message);
    } else {
        message = null;
        console.log('Error Message: ', message);
    }

    console.log('Welcome to login page');
    res.render('authentication/login', {
        pageTitle: "Login | Taste On Wheels",
        message: message,
        className: className,
        email: ''
    })
}

// Post Login 
exports.postLogin = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let className = 'errorFlash'
        return res.render('authentication/login', {
            pageTitle: "Login | Taste On Wheels",
            message: errors.array()[0].msg,
            className: className,
            email: req.body.email
        })
    }
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    console.log("Someone is trying to login");
    console.log(email);
    console.log(password);
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log("Email not found")
                // req.flash('error', 'Incorrect Email or Password');
                // req.flash('className', 'errorFlash');
                return res.render('authentication/login', {
                    pageTitle: "Login | Taste On Wheels",
                    message: 'Incorrect Email or Password',
                    className: 'errorFlash',
                    email: req.body.email
                })
            }
            else {
                bcryptjs.compare(password, user.password)
                    .then(doMatch => {
                        console.log("password match: " + doMatch);
                        if (!doMatch) {
                            req.flash('error', 'Invalid Password');
                            req.flash('className', 'errorFlash');

                            console.log('SESSION STATUS ' + req.session.isLoggedIn);

                            return res.render('authentication/login', {
                                pageTitle: "Login | Taste On Wheels",
                                message: 'Incorrect Password',
                                className: 'errorFlash',
                                email: req.body.email
                            })
                        }
                        // Starting new session
                        req.session.user = user;
                        req.session.isLoggedIn = 'true';
                        console.log(req.session);
                        req.session.save();

                        res.redirect('/dashboard');

                        console.log('Logged In, current session =', req.session);
                    })
            }
        })
}

// Get Sign Up
exports.getSignUp = (req, res, next) => {
    console.log('Welcome to sign up page');

    let message = req.flash('error');
    let className = req.flash('className');

    console.log('Class Name: ', className)

    // Checking if there is any error
    if (message.length > 0) {
        message = message[0];
        console.log('Error Message: ', message);
    } else {
        message = null;
        console.log('Error Message: ', message);
    }

    res.render('authentication/signup', {
        pageTitle: "Sign Up | Taste On Wheels",
        message: message,
        className: className,
        firstName: '',
        lastName: '',
        email: '',
        password: ''

    })
}

// Post Signup
exports.postSignUp = (req, res, next) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    let className = 'errorFlash'

    const email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('authentication/signup', {
            pageTitle: "Sign Up | Taste On Wheels",
            message: errors.array()[0].msg,
            className: className,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
    }

    console.log(email);

    User.find({ email: req.body.email })
        .then(user => {
            if (user.length !== 0) {
                req.flash('error', 'Account with this email already exists');
                req.flash('className', 'errorFlash');
                console.log("user",user);
                console.log('Account with this email already exists');
                return res.render('authentication/signup', {
                    pageTitle: "Sign Up | Taste On Wheels",
                    message: 'Account with this email already exists',
                    className: className,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            }
            // Getting date and time of signup
            const date = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateNow = date.toLocaleDateString('en-US', options);
            const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
            const time = new Date().toLocaleTimeString('en-US', options2);

            // console.log(req.body);

            // Hashing the password using bcryptjs
            bcryptjs.hash(req.body.password, 12)
                .then(hashedPassword => {
                    feedback = [];
                    dateCreated = dateNow;
                    timeCreated = time;

                    // Adding new User
                    const user = new User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        feedback: [],
                        dateCreated: dateNow,
                        timeCreated: time,
                        userType: 'user',
                        password: hashedPassword
                    })
                    user.save().then(result => {
                        console.log(result)

                        // req.session.user = user;
                        // req.session.isLoggedIn = 'true'
                        // console.log(req.session);
                        // req.session.save();
                        // console.log('SESSION STATUS ' + req.session.isLoggedIn);

                        req.flash('error', 'Account created successfully');
                        req.flash('className', 'successFlash');

                        console.log('New Account Created')
                        return res.redirect('/login');

                    });
                })
        })
}



// Post Log Out
exports.postLogOut = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        // Cannot Log Out
        return res.redirect('/');
    })
    console.log("Logged Out")
}