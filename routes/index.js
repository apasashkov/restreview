var express=require('express');
var router=express.Router();
var passport=require("passport");
var User=require("../models/user.js");

//root route
router.get("/",function(req,res){
  res.render('landing')
});



// =======================
// AUTHENTICATION ROUTES
// =======================

//show register form
router.get('/register',function(req,res){
  res.render('register');
});

//sign up logic
router.post('/register',function(req,res){
  var newUser=new User({username:req.body.username});
  User.register(newUser,req.body.password,function(err,createdUser){
    if(err){
      req.flash("error",err.message);
      return res.redirect("register");
    }
    passport.authenticate('local')(req,res,function(){
      req.flash("success","Welcome to RestReview "+createdUser.username);
      res.redirect("/restaraunts");
    })
  })
})

//show login form
router.get('/login',function(req,res){
  res.render('login');
});

//login logic using passport middleware
router.post('/login',passport.authenticate('local',
      {
        successRedirect:"/restaraunts",
        failureRedirect:"/login"
      }),function(req,res){
});

//logout
router.get('/logout',function(req,res){
  req.logout();
  req.flash("success","Logged you out!")
  res.redirect('/restaraunts');
});

module.exports=router;
