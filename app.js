// Importing Express
const express = require("express");
const app = express();

// MongoDB
const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://harsimar:harsimar123@cluster0.wp4m7y7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// MongoDB Sessions
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'session'
})

// npm install --save connect-flash
var flash = require('connect-flash');

// npm install cookie - parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(
    session({
        secret: 'my secret',
        resave: 'false',
        saveUninitialized: false,
        store: store
    })
);

const User = require('./Model/users');

// Importing Path
const path = require('path');

// Serving the public folder as static
app.use(express.static(path.join(__dirname, 'public')));

// Importing Multer for uploading Images
const multer = require('multer');


// Adding body parser
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({ extended: false }));

// Serving login status to all pages
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.user = req.session.user;
    // console.log(res.locals.user);
    next();
})

// Using flash function to send responses to user
app.use(flash());


const fileStorage = multer.diskStorage({
    destination: function (req, res, cb) {
        return cb(null, "./uploads")
    },
    filename: function (req, res, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})




// Setting up the ejs template engine
app.set('view engine', 'ejs');
app.set('views', 'Views')

// Importing the routers
const homeRoutes = require('./Routes/home')
const authRoutes = require('./Routes/auth')
const dashboardRoutes = require('./Routes/dashboard')
const uploadRoutes = require('./Routes/uploadImage')

app.use(homeRoutes.router);
app.use(authRoutes.router);
app.use(dashboardRoutes.router);
app.use(dashboardRoutes.router);
app.use(uploadRoutes);

console.log('Connecting to MongoDB database');
const bcryptjs = require('bcryptjs');

mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('Connected To Food Truck App Database Successfully')
        User.findOne()
            .then(user => {
                if (!user) {
                    const date = new Date();
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const dateNow = date.toLocaleDateString('en-US', options);
                    const options2 = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Toronto' };
                    const time = new Date().toLocaleTimeString('en-US', options2);
                    console.log('No User Exists Till Now, Thereofore creating our first user');
                    let password = 'admin123'

                    bcryptjs.hash(password, 12)
                        .then(hashPassword => {
                            const user = new User({
                                firstName: "Harsimar Kaur",
                                lastName: "Bhatia",
                                email: "harsimar@gmail.com",
                                password: hashPassword,
                                userType: 'admin',
                                dateCreated: dateNow,
                                timeCreated: time
                            })
                            user.save().then(result => {
                                console.log(result);
                            });
                        })
                } else {
                    // User Found
                    // console.log(user);
                }
            })
        // Starting the server
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        })
    })