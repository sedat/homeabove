var express = require("express");
var router = express.Router();
var Photo = require("../models/photo");
var middleware = require("../middleware");

// INDEX ROUTE
router.get("/photos", function(req, res){
    Photo.find({}, function(err, photos){
        if(err){
            console.log(err);
        } else {
            res.render("photos/index", {photos: photos}); 
        }
    })
   
});

// NEW ROUTE
router.get("/photos/new", middleware.isLoggedIn, function(req, res) {
    res.render("photos/new");
});

// CREATE ROUTE
router.post("/photos", middleware.isLoggedIn, function(req, res){
    var publisher = {
        id: req.user._id,
        username: req.user.username
    };
    req.body.photo.publisher = publisher;
    Photo.create(req.body.photo, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/photos");
        }
    })
})
// SHOW ROUTE
router.get("/photos/:id", function(req, res) {
    Photo.findById(req.params.id).populate("comments").exec(function(err, foundPhoto){
       if(err) {
           console.log(err);
       } else {
           res.render("photos/show", {photo: foundPhoto});
       }
    });
})

// EDIT ROUTE
router.get("/photos/:id/edit", middleware.checkPhotoOwnership, function(req, res) {
    Photo.findById(req.params.id, function(err, foundPhoto){
       if(err) {
           console.log(err);
       } else {
           res.render("photos/edit", {photo: foundPhoto});
       }
    });
})
// UPDATE ROUTE
router.put("/photos/:id", middleware.checkPhotoOwnership, function(req, res){
   Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
       if(err) {
           console.log(err);
       } else {
           res.redirect("/photos/" + req.params.id);
       }
   }) ;
});
// DELETE ROUTE
router.delete("/photos/:id", middleware.checkPhotoOwnership, function(req, res){
   Photo.findByIdAndRemove(req.params.id, function(err){
       if(err) {
           console.log(err);
       } else {
           res.redirect("/photos");
       }
   });
});



module.exports = router;