const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 5000;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 const events=[]
// Handle POST requests to the root URL
app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event)
  try {
    axios.post("http://localhost:3000/events", event);
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:3004/events", event);
    axios.post("http://localhost:6000/events", event);
    res.send({ status: "ok" });
    console.log(event.type);
  } catch (error) {
    console.log(error);
  }
});
app.get("/events",async(req,res)=>{
  res.send(events)
})
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
 
});
