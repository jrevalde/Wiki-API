const express = require("express");
const https = require("https");
const app = express();


const ejs = require("ejs");
const mongoose = require('mongoose');
const internal = require("stream");

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

//article route chaining

app.route("/article")
.get(function(req,res){
    Article.find(function(err, result){
        if(err)
        {
            console.log("woopsie");
        }
        else
        {
            console.log(result);
            res.send(result);
        }
       
    });
})
.post(function(req,res){
    var title_post = req.body.title;
    var title_content = req.body.content;

    console.log(title_post);
    console.log(title_content);

    const newArticle = new Article({
        title: title_post,
        content: title_content
    })

    newArticle.save(function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        else
        {
            res.send("Successfully added a new article.")
        }
    });
})
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send("deleted all articles.");
        }
    });
});



//REQUESTS TARGETING SPECIFIC ARTICLE
app.route("/article/:item") 
.get(function(req,res){
    
    Article.findOne({title: req.params.item},function(err, article_item){
        if(err)
        {
            res.send("no specific article found.");
        }
        else
        {
            res.send(article_item);
        }
    });
})
.post(function(req,res){})
.put(function(req,res){
    Article.updateOne({title: req.params.item}, {$set: {title: req.body.title, content: req.body.content}}, function(err){
        if(!err)
        {
            res.send("successfully updated article");
            
        }
        else
        {
            res.send("failed to update.");
        }
    });
})
.patch(function(req,res){
    Article.updateOne({title: req.params.item}, {$set: req.body}, function(err){
        if(!err)
        {
            res.send("Successfully patched.")
        }
        else
        {
            res.send("failed to patch");
        }
    });
})
.delete(function(req,res){
    Article.deleteOne({title: req.params.item}, function(err){
        if(!err)
        {
            res.send("successfully deleted");
        }
        else
        {
            res.send("error, couldn't delete");
        }
    });
});


//ROUTING END
//TODO

app.listen(3031, function() {
  console.log("Server started on port 3031");
});