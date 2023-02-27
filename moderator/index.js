const express = require("express");
const bodyParser = require("body-parser");


const axios = require("axios");

const app = express();
const port = 6000;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const commentsByPostId = {};


app.post("/events", async(req, res) => {
    const {data,type} =req.body
if( type=="CommentC"){
    const status= data.content.includes("orange")?"rejected":"approved";
 await axios.post("http://localhost:5000/events",{
       type:"CommentM",
       data:{
        postId: data.postId,
        id: data.id,
        content:data.content,
        status,
       }  
    }).ct
}
  res.status(201).send({});

});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
