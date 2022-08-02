const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ['Buy Food', 'Eat Food', 'Cook Food'];
const workItem = [];

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", function(req, res){

    const day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItem: items
    })

});


app.get("/work", function(req,res){
    res.render("list", {
        listTitle: "WorkList",
         newListItem: workItem
        });
})

app.get("/aboutme", function(req,res){
    res.render("aboutme");
})


app.post("/", function(req,res){

    console.log(req.body)

    let item = req.body.newItem;

    if(req.body.list === "WorkList"){
        workItem.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }

})




app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
