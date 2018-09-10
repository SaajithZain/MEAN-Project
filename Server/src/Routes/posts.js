const express = require("express");
const router = express.Router();
const multer = require('multer');

const MIME_TYPE_MAP= {
  'image/png' : 'png',
  'image/jpg' : 'jpg',
  'image/jpeg': 'jpg'
}
const imageStorage= multer.diskStorage({
  destination: (req, file, callback) =>{
    const isValid= MIME_TYPE_MAP[file.mimetype];
    let error=new Error("Invalid mime type");
    if(isValid){
      error=null;
    }
    callback(error, "./postImages")
  },
  filename: (req,file, callback) =>{
    const fname= file.originalname.toLowerCase().split(' ').join('-');
    const  extension= MIME_TYPE_MAP[file.mimetype];
    callback(null, fname + '-' + Date.now() +'.' + extension);

  }
});
const Post = require("../models/post");

router.get("", (req, res, next) => {
  Post.find().then(postData => {
    res.status(200).json({
      message: "Successful",
      posts: postData
    });
  });
});

router.post("", multer({storage: imageStorage}).single("image"), (req, res, next) => {
  const hostUrl= req.protocol +'://' + req.get("host");
  const post = new Post({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    imagePath: hostUrl + "/postImages/" + req.file.filename
  });
  post.save().then(savedPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: { ...savedPost,
              id: savedPost._id
            }
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post Deleted Successfully" });
  });
});

router.put("/:id",multer({storage: imageStorage}).single("image"), (req, res, next) => {
    let imagePath=req.body.imagePath;
  if(req.file){
    const hostUrl= req.protocol +'://' + req.get("host");
    imagePath = hostUrl + "/postImages/" + req.file.filename;
  }
    const postData= new Post({
        _id: req.body.id,
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        imagePath: imagePath
    });
    Post.updateOne({ _id: req.params.id}, postData ).then( response =>{
        res.status(200).json({ message: "Updated Succcessfully"});
    });
});

router.get("/:id", (req, res, next) => {

  Post.findById(req.params.id).then( post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message:'Post not found!'});
    }

  });
});

module.exports = router;
