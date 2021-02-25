 const localStrategy = require('passport-local').Strategy;
 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');
 const passport = require('passport');

 const model = require('../model/blog');

 passport.use(
     new localStrategy({usernameField: 'email'},(email, password, done)=>{
        //match user
        model.findOne({email: email})
        .then(user=>{
            if(!user){
                return done(null, false, { message: "That Email is not registered"})
            }

            //match password
            bcrypt.compare(password, user.password,(err, isMatch)=>{
                if(err) throw err;

                if(isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, {message: 'Password is incorrect'});
                }
            });
        }).catch(err=>{
            console.log(err);
        })
     })
 );

 passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    model.findById(id, (err, user) => {
      done(err, user);
    });
});


 module.exports = passport;