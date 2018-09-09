const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const database= require('./src/config/db-config');
const postRoutes= require('./src/Routes/posts');

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

app.listen(process.env.PORT || 3000, (err)=>{
    if(err) {
        console.error(err);
        process.exit(-1);
    }
    console.log("Listening to Port 3000");
});

app.use("/api/posts",postRoutes);

