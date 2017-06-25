var express         =require("express"),
    app             =express(),
    bodyParser      =require("body-parser")
    passport        =require("passport"),
    LocalStrategy   =require("passport-local"),
    methodOverride  =require("method-override"),
    mongoose        =require("mongoose"),
    flash           =require("connect-flash"),
    seedDB          =require("./seeds.js"),
    Comment         =require('./models/comment.js'),
    User            =require('./models/user.js'),
    Restaraunt      =require('./models/restaraunt.js');

//Requiring routes;
var commentRoutes     =require("./routes/comments.js"),
    restarauntRoutes  =require("./routes/restaraunts.js"),
    indexRoutes       =require("./routes/index.js");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


mongoose.connect("mongodb://localhost/restaraunts");
//mongoose.connect("mongodb://anton:anton@ds139072.mlab.com:39072/restreview");
//mongoose.connect(process.env.DATABASEURL);
console.log(process.env.DATABASEURL);

//seedDB();

//Passport configuration
app.use(require("express-session")({
  secret:"hello there stanger",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass req.user and flash variables to every template
app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});


app.use("/",indexRoutes);
app.use("/restaraunts",restarauntRoutes);
app.use("/restaraunts/:id/comments",commentRoutes);

app.listen(process.env.PORT || 3000,function(){
  console.log("Running on port 3000")
});


