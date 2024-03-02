// Importing Express
const express = require("express");
const app = express();


// Importing Path
const path = require('path');

// Serving the public folder as static
app.use(express.static(path.join(__dirname,'public')));

// Adding body parser
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({extended:false}));

// Setting up the ejs template engine
app.set('view engine','ejs');
app.set('views','Views')


// Importing the routers
const homeRoutes= require('./Routes/home')
app.use(homeRoutes.router);





console.log('Testing');
app.listen(3000,()=>{
    console.log('Listening on port 3000');
})