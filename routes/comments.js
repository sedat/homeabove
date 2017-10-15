var express = require("express");
var router = express.Router();
var Photo = require("../models/photo");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");

//new comment
router.get("/photos/:id/comment/new", middleware.isLoggedIn, function(req, res){
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new",{photo: photo});
        }
    })
});

router.post("/photos/:id/comment", middleware.isLoggedIn, function(req, res){
    Photo.findById(req.params.id, function(err, photo){
       if(err) {
           console.log(err);
           res.redirect("/photos");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   console.log(err);
               } else {
                   // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                   // save comment
                    comment.save();
                   photo.comments.push(comment);
                   photo.save();
                   res.redirect("/photos/" + req.params.id);
               }
           });
       } 
    });
});

router.get("/photos/:id/comment/:comment_id/edit",  function(req, res){
    Photo.findById(req.params.id, function(err, photo) {
       if(err) {
           res.redirect("back");
       } else {
           Comment.findById(req.params.comment_id, function(err, comment) {
               res.render("comments/edit",{comment: comment, photo: photo});
           })
       }
   })
    
});

router.put("/photos/:id/comment/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Photo.findById(req.params.id, function(err, photo) {
       if(err) {
           res.redirect("back");
       } else {
           Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
               if(err) {
                   res.redirect("back");
               } else {
                   res.redirect("/photos/" + req.params.id);
               }
           });
       }
   }) 
});

router.delete("/photos/:id/comment/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("back");
        }
    })
});

module.exports = router;
