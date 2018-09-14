const mongoose = require('mongoose');
const uniqueValidator= require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
    email: {
         type : String, 
         require: true,
         unique: true
           },
    password: {
         type: String, 
         require : true
        },
    username : {
        type: String,
        require: true
    },  
    imagePath: {
       type: String,
       require: true
    }    

});

userSchema.plugin(uniqueValidator);
module.exports= mongoose.model('User', userSchema);