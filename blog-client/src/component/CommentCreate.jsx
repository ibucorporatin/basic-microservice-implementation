import React, { useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";

function CommentCreate({ id, comments }) {
  const [comment, setcomment] = useState("");
  // console.log(comments);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:4000/posts/${id}/comments`, {
        content: comment,
      })
      .then((res) => console.log(res));
    setcomment("");
  };

  const handleInputChange = (event) => {
    setcomment(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CommentList id={id} comments={comments} />
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            comments
          </label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CommentCreate;
