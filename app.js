const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

const app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wekiDB");
    
const articleSchema = {
    title: String,
    content: String
}

const Article =mongoose.model("Article",articleSchema); 

/////////////////////////////// fetching posting deleteing the entire data ///////////////////////////


app.get("/articles", function(req,res){
    Article.find({}).then(function(Found){
        res.send(Found)
    })
    .catch(function(err){
        console.log(err);
      })
})

app.post("/articles/",function(req,res){
    

    const newarticle= new Article({
        title : req.body.title,
        content : req.body.content
    })

    newarticle.save().then(function(post){
        res.send("succesfully added")
    })
})

app.delete("/articles", function(req,res){
    Article.deleteMany({"title":"mongodb"}).then(function(deleted){
        res.send("successfully deleted the content");
    })
    .catch(function(err){
        console.log(err);
      })
})

// ///////////////////////////////// fetching posting deleteing the specified data /////////////////////////// 


app.route("/articles/:articletitle")
.get(function(req,res){
    Article.findOne({"title":req.params.articletitle}).then(function(found){
        res.send(found)
    })
    .catch(function(err){
        console.log(err);
    })
})

.put(function(req,res){
    Article.updateOne(
        {"title":req.params.articletitle},
        {title:req.body.title, content:req.body.content},
        {overwriten:true}).then(function(update){
            res.send(update)
        })
        .catch(function(err){
            console.log(err);
        })
})

.patch(function(req,res){
    Article.updateOne(
        {"title":req.params.articletitle},
        {$set:req.body},
        {overwriten:true}).then(function(update){
            res.send(update)
        })
        .catch(function(err){
            console.log(err);
        })
})

.delete(function(req,res){
    Article.deleteOne(
        {"title":req.params.articletitle})
        .then(function(dele){
            res.send(dele)
        })
        .catch(function(err){
            console.log(err);
        })
})

app.listen(3000,function(req,res){
    console.log("server has started in port 3000")
})