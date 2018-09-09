const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("", (req, res, next) => {
  Post.find().then(postData => {
    res.status(200).json({
      message: "Successful",
      posts: postData
    });
  });
});

router.post("", (req, res, next) => {
  const post = new Post({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent
  });
  post.save().then(result => {
    res.status(201).json({
      message: "Post added successfully",
      id: result._id
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted Successfully" });
  });
});

router.put("/:id", (req, res, next) => {
    const postData= new Post({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent
    });
    Post.updateOne({ _id: req.params.id}, postData ).them( response =>{
        res.status(200).json({ message: "Updated Succcessfully"});
    });
})

module.exports = router;
