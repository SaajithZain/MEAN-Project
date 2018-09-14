const express = require("express");
const router = express.Router();
const User= require('../models/user.model');
const bcrypt= require('bcrypt');
const jwtToken= require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then( hashCode =>{
        
        const user= new User({
            email: req.body.email,
            password: hashCode,
            username: req.body.username
                     
        });

        user.save().then(result => {
            res.status(201).json({
                message: "User Created Successfully",
                result: result
            });
        }, error =>{
            res.status(400).json({
                message: " Sorry! The email enterd is already being used"
            })
        }).catch(error => {
            console.log(error);
        });   
    });
});


router.post('/login', (req, res, next) => {
    let loggedUserData;
    User.findOne({ email: req.body.email}).then( user =>{
     if(!user){
         return res.status(401).json({
             message: "Authentication failed!, Invalid username"
         });
        }
    loggedUserData=user;    
    return bcrypt.compare(req.body.password, user.password);

   }, err =>{
       res.status(401).json({
           message: " Invalid User! The userName does not exist"
       })
   }).then( compareResult => {
        if(!compareResult){
          return res.status(401).json({
                message: "Auth Failed, Password Does Not match"
            });
        }
    //create JWT token if user authenticated
    const token=jwtToken.sign({email: loggedUserData.email, userId: loggedUserData._id}, 
        "The_Secret_String",{expiresIn: "1h" });
       return res.status(200).json({
            messgae:"successfully logged In",
            token: token,
            userId: loggedUserData._id
        })
    }).catch(err => {
       return res.status(401).json({
           message: "Auth Failed"
       })
   });
});
module.exports= router;

