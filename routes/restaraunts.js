//====================
// RESTARAUNT ROUTES
// ==================

var express=require('express');
var router=express.Router();

var Restaraunt=require("../models/restaraunt.js");
//index.js is automatically requied in middleware folder
var middleware=require("../middleware/");
//pass any google address and it will return JSON output
var geocoder=require("geocoder");

//Index Route
router.get("/",function(req,res){
  //get all restaraunts from db
  Restaraunt.find({},function(err,allRestaraunts){
    if(err){
      console.log(err);
    } else {
      res.render('index',{restaraunts:allRestaraunts})
    }
  })
  
})

//New route - show form to add a restaraunt
router.get("/new",middleware.isLoggedIn,function(req,res){
  res.render("./restaraunts/new");
})

//Create route - add new restaraunt to DB
router.post("/",middleware.isLoggedIn,function(req,res){
  //grab the data from the form request (using body parser)
  var name=req.body.name;
  var image=req.body.img;
  var desc=req.body.desc;
  
  //grab the data from user to put into created Rest
  var author={
    id:req.user._id,
    username:req.user.username
  }

  var price=req.body.price;

  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newRest= {name: name,price:price, image: image, description: desc, author:author, location: location, lat: lat, lng: lng};
    // Create a new restaraunt and save to DB
    Restaraunt.create(newRest, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to restaraunts page
            res.redirect("/restaraunts");
        }
    });
  });
});


//Show route -  show info about one restaraunt
router.get("/:id",function(req,res){
  //find a restaraunt with provided Id
  Restaraunt.findById(req.params.id).populate("comments").exec(function(err,foundRestaraunt){
    if(err){
      console.log(err)
    } else {
      //render the  show page
      res.render('./restaraunts/show',{restaraunt:foundRestaraunt});
    }
  })
});


//EDIT restaraunt route
router.get("/:id/edit",middleware.checkRestarauntOwnership,function(req,res){
    Restaraunt.findById(req.params.id,function(err,foundRestaraunt){
      res.render('restaraunts/edit',{restaraunt:foundRestaraunt});
    });
});


//UPDATE restaraunt route
router.put("/:id",middleware.checkRestarauntOwnership,function(req,res){

geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};

  //find and update the correct restaraunt
  Restaraunt.findByIdAndUpdate(req.params.id,req.body.restaraunt,function(err,updatedRestaraunt){
    if(err){
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      req.flash("success","Successfully Updated!");
      res.redirect("/restaraunts/"+req.params.id);
    }
  })
});
});













//DESTROY restaraunt route
router.delete("/:id",middleware.checkRestarauntOwnership,function(req,res){
  Restaraunt.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.redirect("/restaraunts");
    } else {
      res.redirect("/restaraunts");
    }
  })
})


module.exports=router;
