const express = require("express");
const router = express.Router();
const User= require('../models/user.model');
const bcrypt= require('bcrypt');
const jwtToken= require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
 bcrypt.hash(req.body.password, 10).then( hashCode =>{
     const user= new User({
        email: req.body.email,
        password: hashCode
     });

     user.save().then(result => {
        res.status(201).json({
            message: "User Created Successfully",
            result: result
        });
     }).catch(err => {
         res.status(500).json({
            error: err
         })
     });
     
 })
});


router.post('/login', (req, res, next) => {
    let loggedUserData;
    User.findOne({ email: req.body.email}).then( user =>{
     if(!user){
         return res.status(401).json({
             message: "Authentication faile!, Invalid username"
         });
        }
    loggedUserData=user;    
    return bcrypt.compare(req.body.password, user.password);

   }).then( compareResult => {
        if(!compareResult){
          return res.status(401).json({
                message: "Auth Failed, Password Does Not match"
            });
        }

    const token=jwtToken.sign({email: loggedUserData.email, userId: loggedUserData._id}, 
        "The_Secret_String",{expiresIn: "1h" });
       return res.status(200).json({
            messgae:"successfully logged In",
            token: token
        })
    }).catch(err => {
       return res.status(401).json({
           message: "Auth Failed"
       })
   });
});
module.exports= router;

