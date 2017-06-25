//all the middleware goes here

var Comment         =require('../models/comment.js');
var Restaraunt      =require('../models/restaraunt.js');
var middlewareObj={};

middlewareObj.checkRestarauntOwnership=function(req,res,next){
  //is user logged in
  if(req.isAuthenticated()){
    Restaraunt.findById(req.params.id,function(err,foundRestaraunt){
      if(err){
        req.flash("error","Restaraunt not found");
        res.redirect("back");
      } else {
        //Does the user own the restaraunt?
        //foundRestaraunt.author.id is a mongoose object while
        //req.user._id is a string  so we can't compare them
        //directly and use equals() mongoose method
        if(foundRestaraunt.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error","You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error","You need to be logged in to do that!");
    //takes the user back where he came from
    res.redirect("back");
  }

};

middlewareObj.checkCommentOwnership=function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err){
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error","You don't have permission to do that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error","You need to be logged in to do that!");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn=function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error","You need to be logged in to do that!")
  res.redirect("/login")
}



module.exports=middlewareObj;
