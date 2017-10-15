var mongoose = require("mongoose");
var Photo = require("./models/photo");
var Comment = require("./models/comment");

var data = [
    {
   title: "Hello World",
    image: "http://az616578.vo.msecnd.net/files/2016/10/15/6361209775984223581480794734_space111.jpg",
   
   publisher: "Sedat",
   body: "Hey"
    },
    {
   title: "Bla Bla",
    image: "http://cdn.wallpapersafari.com/87/68/I3hwXi.jpg",
   publisher: "Sedat",
   body: "Hey"
    }    
    
    
]

Photo.remove({}, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("deleted");
        data.forEach(function(seed){
            Photo.create(seed, function(err, photo){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a photo");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                photo.comments.push(comment);
                                photo.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }
})