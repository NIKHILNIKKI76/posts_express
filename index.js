const express = require("express");
const app = express();

const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(express.urlencoded ({extended :true}));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


  

app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs")
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(post => post.id === id);

    // Assuming each post has an 'id' property
    res.render("seeInDetail.ejs", { post });
});


app.post("/posts",(req,res) =>{
    const newPost = {
        id : uuidv4(),
        userName: req.body.userName,
        content: req.body.content,
    };
    posts.push(newPost);
    // console.log(req.body);
    res.redirect("/posts");
})

app.get("/posts/:id/edit" ,(req,res) =>{
    let { id } = req.params;
    let post = posts.find(post => post.id === id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id" ,(req,res) =>{
    let {id} = req.params ;
    let newContent = req.body.content;
    let post = posts.find(post => post.id === id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/delete", (req, res) => {
    const { id } = req.params;
    // Find the index of the post with the given ID
    const index = posts.findIndex(post => post.id === id);
    
    // Check if the post with the given ID exists
    if (index !== -1) {
        // Remove the post from the posts array
        posts.splice(index, 1);
    } 
    res.redirect("/posts");
});


let posts = [
    {
        id : uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',        
        userName : "nikhilChary",
        content : "default content",
    },{
        id : uuidv4(),
        userName : "rohitReddy",
        content : "default content",
    },{
        id : uuidv4(),
        userName : "saieeshBapatla",
        content : "default content",
    }
]

app.listen(port,() =>{
    console.log(`listening to port ${port}`);
})
