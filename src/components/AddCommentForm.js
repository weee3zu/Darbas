import React, { useState } from "react";
import { addComment } from "../api/QuestionsAPI.js";
import { CookieContext } from "../hooks/CookieContext.js";
import { useContext } from "react";

const AddCommentForm = ({ postId, refreshComments }) => {
  const [commentText, setCommentText] = useState("");
  const { handleLogin, handleLogOut, cookies } = useContext(CookieContext);

  const handleAddComment = () => {
    addComment(commentText, postId, cookies.user)
      .then((newComment) => {
        console.log("Comment added successfully:", newComment);
        setCommentText("");
        refreshComments();
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <div>
      {cookies.user ? (
        <>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter your comment"
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </>
      ) : (
        <p>Please login to make a comment.</p>
      )}
    </div>
  );
};

export default AddCommentForm;
