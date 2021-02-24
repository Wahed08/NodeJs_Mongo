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

//signup handling
router.post('/signup',(req,res)=>{
    const {name, email, password, password2} = req.body;

    const error = [];
    //check required fields
    if(!name || !email || !password || !password2){
        error.push({msg : "Please fill all the fields"});
    }

    //check password match
    if(password!==password2){
        error.push({msg : "Passwords do not match"});
    }

    //check password length
    if(password.length <6 ){
        error.push({msg : 'Password should be at least 6 characters'});
    }

    if(error.length > 0){
        res.render('signup',{
            error,
            name,
            email,
            password,
            password2
        });
    }else{
        res.send("pass");
    }
})

module.exports = router;