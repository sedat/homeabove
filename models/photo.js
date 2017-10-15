var mongoose = require("mongoose");

// MONGOOSE MODEL CONFIG
var photoSchema = new mongoose.Schema({
   title: String,
   image: String,
   date: {type: Date, default: Date.now},
   publisher: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
   },
   body: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Photo", photoSchema);