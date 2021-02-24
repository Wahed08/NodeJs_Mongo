const express = require("express");
const routes = require('./router/index');
const user_routes = require('./router/user');
//const expressLayout = require('express-ejs-layouts');

const app = express();

//ejs
//app.use(expressLayout);
app.set('view engine', 'ejs');

//routes
app.use('/',routes);
app.use('/user',user_routes);


app.listen(4000,console.log("Server is running"));