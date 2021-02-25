const express = require("express");
const routes = require('./router/index');
const user_routes = require('./router/user');
const mongoose = require("mongoose");
const db = require('./DBconfig/config');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//const expressLayout = require('express-ejs-layouts');

const app = express();

//passport config
require('./DBconfig/passport').passport;

//connection to database
const Database = db.DB_URI;
mongoose.connect(Database, {useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>console.log('success')).catch(err=>console.log(err));

//ejs
//app.use(expressLayout);
app.set('view engine', 'ejs');

//middleware
app.use(express.urlencoded({extended:false}));
//express session middleware 
app.use(session({
    secret: 'bla bla',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//routes
app.use('/',routes);
app.use('/user',user_routes);


app.listen(4000,console.log("Server is running"));