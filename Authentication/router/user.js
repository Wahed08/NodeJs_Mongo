const express = require("express");
const router = express.Router();

//login page
router.get('/login',(req,res)=>{
    res.render('login')
});

//signUp page
router.get('/signup',(req,res)=>{
    res.render('signup')
});

module.exports = router;