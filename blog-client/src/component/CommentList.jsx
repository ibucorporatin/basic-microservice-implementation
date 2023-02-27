import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";

function CommentList({ id, comments }) {
  return (
    <div>
      <h6>comments List</h6>

      <ul>
        {comments.map((comment) => {
          let content;
          if(comment.status==="approved"){
       content=comment.content
          }
          if(comment.status==="pending"){
            content="this comment is awaiting moderate";
               }
               if(comment.status==="rejected"){
                content="this comment has been rejected!!";
                   }
      return    <li key={comment.id}>{content}</li>
})}
      </ul>
    </div>
  );
}

export default CommentList;
