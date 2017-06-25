//====================
// COMMENT ROUTES
// ==================

var express=require('express');
//we merge params to pass :id params in req.params.id
var router=express.Router({mergeParams:true});
var Restaraunt=require("../models/restaraunt.js")
var Comment=require("../models/comment.js");

//index.js is automatically requied in middleware folder
var middleware=require("../middleware/");

//comment form to add a new comment
router.get("/new",middleware.isLoggedIn,function(req,res){
  Restaraunt.findById(req.params.id,function(err,foundRestaraunt){
    if(err){
      console.log(err);
    } else {
      res.render('./comments/new',{restaraunt:foundRestaraunt})
    }
  })
})

//create comment route
router.post("/",middleware.isLoggedIn,function(req,res){
  //lookup restaraund using ID
  Restaraunt.findById(req.params.id,function(err,foundRestaraunt){
    if(err){
      console.log(err);
      redirect("/restaraunts");
    } else {
      //create new comment
      Comment.create(req.body.comment,function(err,createdComment){
        if(err){
          req.flash("error","Something went wrong");
          console.log(err);
        } else {
          //add username and id to comment
          createdComment.author.id=req.user._id;
          createdComment.author.username=req.user.username;
          //save the comment
          createdComment.save();
          //addnew comment to restaraunt
          foundRestaraunt.comments.push(createdComment);
          foundRestaraunt.save();
          //redirect to restaraunt showpage
          req.flash("success","Successfully added comment!");
          res.redirect('/restaraunts/'+foundRestaraunt._id);
        }
      })
    }
  })
})

//EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render('comments/edit',{restaraunt_id:req.params.id,comment:foundComment});

    }
  })
})

//UPDATE ROUTE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/restaraunts/"+req.params.id)
    }
  })
});

//DESTROY COMMENT ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if (err){
      res.redirect("back");
    } else {
      req.flash("success","Comment deleted!");
      res.redirect("/restaraunts/"+req.params.id);
    }
  })
});



module.exports=router;
