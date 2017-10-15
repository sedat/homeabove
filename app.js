var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    Photo = require("./models/photo.js"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    app = express();

var indexRoutes = require("./routes/index");
var photoRoutes = require("./routes/photos");
var commentRoutes = require("./routes/comments");

mongoose.connect("mongodb://admin:188963520@ds119395.mlab.com:19395/photoapp", {useMongoClient: true});   
//mongoose.connect("mongodb://localhost/my_app", {useMongoClient: true});   

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rusty",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


app.use("/", indexRoutes);
app.use("/", photoRoutes);
app.use("/", commentRoutes);
   

// SERVER LISTEN
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
})