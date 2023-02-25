import React from "react";
import PostCreate from "./component/PostCreate";
import PostList from "./component/PostList";

const App = () => {
  return (
    <div className="container">
      <h1>create post</h1>
      <PostCreate />
      <PostList />
    </div>
  );
};

export default App;
