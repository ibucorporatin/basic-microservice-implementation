const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const port = 3004;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  //   console.log(posts);
  res.status(200).json(posts);
});
app.post("/events", (req, res) => {
  const event = req.body.type;
  const { data } = req.body;
  console.log(data);

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
    // console.log(posts[postID]);
  }

  res.send({});
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
