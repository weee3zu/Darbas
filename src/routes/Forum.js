import React from "react";
import Question from "../components/Question";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api/QuestionsAPI";
import { useEffect } from "react";
import { useState } from "react";
import { deletePostById } from "../api/QuestionsAPI.js";
import { CookieContext } from "../hooks/CookieContext.js";
import { useContext } from "react";

export default function Forum() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLogin, handleLogOut, cookies } = useContext(CookieContext);

  function handleNavigate(Id) {
    console.log("navigating.");
    console.log(Id);
    navigate(`/subforum/${Id}`, { state: { id: Id } });
  }

  async function handleDeletePost(postId) {
    let result = await deletePostById(postId);
    if (result) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
    setErrorMessage("Post can't be deleted");
  }

  useEffect(() => {
    getPosts().then((result) => {
      setPosts(result);
      console.log("Posts!");
      console.log(result);
    });
  }, []);

  return (
    <>
      <h1>{errorMessage}</h1>
      {cookies.user ? (
        <button onClick={() => navigate("/addpost")}>Add Post</button>
      ) : (
        <p>Please log in to add a post</p>
      )}
      <div>
        {posts.map((post) => (
          <Question
            key={post.id}
            post={post}
            handleNavigate={handleNavigate}
            handleDeletePost={handleDeletePost}
          />
        ))}
      </div>
    </>
  );
}
