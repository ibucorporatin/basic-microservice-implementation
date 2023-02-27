const express = require("express");
const bodyParser = require("body-parser");
const axios=require("axios")
const cors = require("cors");

const app = express();
const port = 3004;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const eventHandler=(event,data)=>{
  if (event === "PostC") {
    const postID = data.id;

    posts[postID] = {
      id: postID,
      title: data.title,
      comments: [],
    };
  } else if (event === "CommentC") {
    postID = data.postId;
    const comment = posts[postID].comments;
    comment.push(data);
    console.log(comment);
  }else if(event==="CommentU"){
    // console.log(data,"sdsdds")
    const {id,postId,status,content}=data
    const comments=posts[postId].comments; 
    console.log(comments,"sss")
    const comment=comments.find((c)=>c.id==id)
    comment.status=status;
    comment.content=content;
    // console.log("llll")
  }
}
app.get("/posts", (req, res) => {
  //   console.log(posts);
  res.status(200).json(posts);
});
app.post("/events", (req, res) => {
  const event = req.body.type;
  const { data } = req.body;
  // console.log(data);
 eventHandler(event,data)
  

  res.send({});
});

// Start the server
app.listen(port, async() => {
  console.log(`Server listening on port ${port}`);
try {
  const res =await axios.get("http://localhost:5000/events")
  // console.log(res.data)
  for (let event of res.data) {
    const {type,data}=event
  console.log(event)
  
   eventHandler(type,data)
  }
} catch (error) {
  console.log(error)
}

});
