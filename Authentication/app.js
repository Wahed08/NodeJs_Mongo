const express = require("express");
const routes = require('./router/index');
const user_routes = require('./router/user');
const mongoose = require("mongoose");
const db = require('./DBconfig/config');
//const expressLayout = require('express-ejs-layouts');

const app = express();

//connection to database
const Database = db.DB_URI;
mongoose.connect(Database, {useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>console.log('success')).catch(err=>console.log(err));

//ejs
//app.use(expressLayout);
app.set('view engine', 'ejs');

//middleware
app.use(express.urlencoded({extended:false}));

//routes
app.use('/',routes);
app.use('/user',user_routes);


app.listen(4000,console.log("Server is running"));