const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// Handle GET requests to the root URL
app.get("/posts", (req, res) => {
  res.status(201).json(posts);
});

// Handle POST requests to the root URL
app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = {
    id,
    title,
  };
  await axios.post("http://localhost:5000/events", {
    type: "PostC",
    data: {
      id,
      title,
    },
  });

  res.status(201).json(posts[id]);
});
app.post("/events", (req, res) => {
  console.log("receved event in posts", req.body.type);
  res.status(201).send({});
});
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
