const express = require("express");
const bodyParser = require("body-parser");

const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 4000;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

// Handle GET requests to the root URL
app.get("/posts/:id/comments", (req, res) => {
  res.status(201).json(commentsByPostId[req.params.id] || []);
});

// Handle POST requests to the root URL
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const id = req.params.id;
  const { content } = req.body;
  const comments = commentsByPostId[id] || [];

  comments.push({
    id: commentId,
    content,
    status:"pending"
  });
  commentsByPostId[id] = comments;
  try {
    await axios.post("http://localhost:5000/events", {
      type: "CommentC",
      data: {
        postId: req.params.id,
        id: commentId,
        content,
        status:"pending"
      },
    });
  } catch (error) {
    console.log("error in comment");
  }
  res.status(201).json(comments);
});

app.post("/events", async(req, res) => {

  const {data,type}=req.body

   if(type==="CommentM"){
     const { id,status,postId,content }=data
     const comments= commentsByPostId[postId]
     
     const comment=comments.find((c)=>{
    return c.id===id
     })
     comment.status=status;
     await axios.post("http://localhost:5000/events", {
      type: "CommentU",
      data:data
    }).then(()=>console.log("ir")).catch(()=>console.log("errpr"))
    }
  res.status(201).send({});
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
