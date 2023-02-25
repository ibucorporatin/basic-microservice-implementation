import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";

function CommentList({ id, comments }) {
  return (
    <div>
      <h6>comments List</h6>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
