const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    postTitle: {
         type : String, 
         require: true
           },
    postContent: {
         type: String, 
         require : true
        },
    imagePath: {
       type: String,
       require: true
    }    

});

module.exports= mongoose.model('Post', postSchema);