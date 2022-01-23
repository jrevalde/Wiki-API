const express = require("express");
const https = require("https");
const app = express();


const ejs = require("ejs");
const mongoose = require('mongoose');

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');


//Database Connection and Schema
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);



//ROUTING STARTS HERE

app.get("/",function(req, res){



    console.log("Deez Succulent Nutz");
    res.render("home");
})

app.post("/", function(req, res){

})

app.get("/article", function(req, res){
    console.log("Deez Yummy Nutz");
    Article.find(function(err, result){
        if(err)
        {
            console.log("woopsie");
        }
        else
        {
            console.log(result);
        }
       
    })

})

app.post("/article", function(req,res){

})


//ROUTING END
//TODO

app.listen(3031, function() {
  console.log("Server started on port 3031");
});