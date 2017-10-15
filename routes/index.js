var express = require("express");
var router = express.Router();
var Photo = require("../models/photo");
var User = require("../models/user");
var passport = require("passport");

// INDEX ROUTE
router.get("/", function(req, res){
   res.redirect("/photos"); 
});

//show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// handling register logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/photos");
            })
        }
    })
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
})

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/photos",
        failureRedirect: "/login"
    }), function(req, res){
    
});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/photos");
})

module.exports = router;
