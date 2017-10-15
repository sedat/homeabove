var Photo = require("../models/photo");
var Comment = require("../models/comment");

var middlewareObj = {};

// middlewares goes here

middlewareObj.checkPhotoOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Photo.findById(req.params.id, function(err, foundPhoto) {
            if (err) {
                res.redirect("back");
            } else {
                if(foundPhoto.publisher.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err) {
                    res.redirect("back");
                } else {
                    // does user own the campground?
                    if(foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect("back");
                    }
                }
            });
        } else {
             res.redirect("back");
        }  
};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()) {
      return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;