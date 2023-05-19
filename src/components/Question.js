import React from "react";
import VoteSystem from "./VoteSystem";
import "./css/Question.css";
import { CookieContext } from "../hooks/CookieContext.js";
import { useContext } from "react";
import { deletePostById } from "../api/QuestionsAPI.js";

export default function Question({ post, handleNavigate, handleDeletePost }) {
  const { handleLogin, handleLogOut, cookies } = useContext(CookieContext);
  const handleClick = () => {
    handleNavigate(post.id);
  };

  return (
    <>
      <br />
      <div className="Grid">
        <div>
          <h2></h2>
          <VoteSystem post={post} />
        </div>
        <div>
          <h2>{post.title}</h2>
          <h5>{post.author}</h5>
          <h5>{post.body}</h5>
          {post.isEdited ? <h3>Is edited</h3> : <h3>Not edited</h3>}

          <button onClick={handleClick}>Go to FORUM</button>
        </div>
        <div>
          {cookies.user !== post.author && <h4>Not my post</h4>}
          {cookies.user === post.author && <h4>Edit</h4>}
          {cookies.user === post.author && (
            <button onClick={() => handleDeletePost(post.id)}>
              Delete post
            </button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}
