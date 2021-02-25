const express = require("express");
const router = express.Router();
const {authenticated} = require('../DBconfig/authentication');

//welcome page
router.get('/',(req,res)=>{
    res.render('welcome')
});

//dashboard page
router.get('/dashboard', authenticated, (req,res)=>{
    res.render('dashboard',{
        name : req.user.name
    })
});

module.exports = router;