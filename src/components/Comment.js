import React, { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <>
        <p>Author: {comment.profileName}</p>
        <p>Text: {comment.body}</p>
        <hr />
      </>
    </div>
  );
};

export default Comment;
