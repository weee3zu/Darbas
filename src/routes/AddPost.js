import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CookieContext } from "../hooks/CookieContext.js";
import { useContext } from "react";
import { addPost } from "../api/QuestionsAPI.js";

export default function AddPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { handleLogin, handleLogOut, cookies } = useContext(CookieContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "body") {
      setBody(value);
    }
    if (id === "title") {
      setTitle(value);
    }
  };

  const checkValues = (cookies, title, body) => {
    if (typeof cookies.user === "undefined") {
      setErrorMessage("Please login.");
      return false;
    }

    if (title.length < 2 || body.length < 5) {
      // Handle other validation errors if needed
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async () => {
    if (!checkValues(cookies, title, body)) {
      return;
    }
    console.log(`adding post from ${cookies.user}`);
    let is = await addPost(title, body, cookies.user);
    console.log(is);
  };

  return (
    <>
      <h1>Add post!</h1>
      <h5>Sub Topic</h5>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="name"
            id="title"
            onChange={(e) => handleInputChange(e)}
          />
        </label>
      </form>

      {title.length > 0 && title.length < 5 && (
        <p>Title must be at least 5 characters ({title.length})</p>
      )}

      <br />
      <form>
        <label>
          Body:
          <input
            type="text"
            name="name"
            id="body"
            onChange={(e) => handleInputChange(e)}
          />
        </label>
      </form>
      <br />

      {body.length > 0 && body.length < 5 && (
        <p>Body must be at least 5 characters ({body.length})</p>
      )}

      <button onClick={() => navigate("/forum")}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
      <p>{errorMessage}</p>
    </>
  );
}
