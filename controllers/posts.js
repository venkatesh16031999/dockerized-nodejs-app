const database = require("../db/db");
const db = database.getDb;

exports.addPost = async (req,res) =>{
    try{
        const post = await db().collection("post").insert({title:"title one",body:"body one"});
        if(!post){
            res.status(400).send({data:"Post not added"});   
        }
        res.status(201).send({data:"Post added successfully"});
        return;
    }catch(e){
        res.status(500).send({"Error":e});
    }
}

exports.getPost =async (req,res) =>{
    try{
        const post = [];
        await db().collection("post").find({}).forEach(element => {
            post.push(element);
        });
        res.status(200).send({data:post});        
    }catch(e){
        res.status(400).send({"Error":e});
    }
}