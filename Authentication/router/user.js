const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const model = require("../model/blog");
const passport = require('passport');

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

    const errors = [];
    //check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg : "Please fill all the fields"});
    }

    //check password match
    if(password!==password2){
        errors.push({msg : "Passwords do not match"});
    }

    //check password length
    if(password.length <6 ){
        errors.push({msg : 'Password should be at least 6 characters'});
    }

    if(errors.length > 0){
        res.render('signup',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        //validation process
         model.findOne({email: email}).then(user=>{
             if(user){
                    //user exist
                    errors.push({msg: "Email is already registered"})
                    res.render('signup',{
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
             }else{
                const newModel = new model({
                    name,
                    email,
                    password
                });
                //hash password
                bcrypt.genSalt(10, (err,salt) =>{
                    bcrypt.hash(newModel.password,salt,(err,hash)=>{
                        if(err) throw err;
                        //set password hash
                        newModel.password = hash;

                        //save the user
                        newModel.save().then(user=>{
                            req.flash('success_msg', 'You are now registered');
                            res.redirect('/user/login');
                        }).catch(err=>console.log(err))
                    })
                })
             }
         })
    }
})

//login handling
router.post('/login',(req, res, next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

//logout handle
router.get('/logout',(req, res)=>{
    req.logout();
    req.flash('success_msg', 'You are successfully logged out');
    res.redirect('/user/login');
})


module.exports = router;