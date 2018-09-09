const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const database= require('./src/config/db-config');
const Post= require('./src/models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    res.setHeader("Access-Control-Allow-Origin","http://localhost:4200");
    next();
});

app.get('/api/posts',(req, res, next) => {
Post.find().then(( postData )=>{
    console.log(postData);
    res.status(200).json({ 
        message: "Successful", 
        posts: postData
    });
});
   
});

app.post('/api/posts', (req, res, next)=>{
   
    const post= new Post({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent    
    });
   post.save().then(result => {
        res.status(201).json({
            message: "Post added successfully",
            id: result._id
        });
    }); 
   
})


app.delete('/api/posts/:id', (req, res, next) => {
 console.log(req.params.id);
 Post.deleteOne({_id : req.params.id }).then( result =>{
     console.log(result);
     res.status(200).json({message: "Post Deleted Successfully"});
 });
});

app.listen(process.env.PORT || 3000, (err)=>{
    if(err) {
        console.error(err);
        process.exit(-1);
    }
    console.log("Listening to Port 3000");
});


