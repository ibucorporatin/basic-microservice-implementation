import React, { useState } from "react";
import axios from "axios";

function PostCreate() {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/posts", {
        title,
      })
      .then((res) => console.log(res));
    setTitle("");
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PostCreate;
