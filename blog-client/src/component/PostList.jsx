import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Posts List</h1>

      {Object.values(posts).map((post) => (
        <div
          key={post.id}
          className="card mb-3 border-primary "
          style={{ width: "18rem" }}
        >
          {/* {console.log(posts.comments)} */}
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            {/* <CommentCreate id={post.id} /> */}
            <CommentCreate
              className="card-text"
              id={post.id}
              comments={post.comments}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
