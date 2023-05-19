import React from "react";
import { useState } from "react";
import "./css/RegisterField.css";
import { doesUserExist, registerUser } from "../api/Auth.js";
import { useNavigate } from "react-router-dom";
import { CookieContext } from "../hooks/CookieContext.js";
import { useContext } from "react";

export default function RegisterField() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLogin, handleLogOut, cookies } = useContext(CookieContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUsername(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const checkValues = () => {
    if (username.length < 2) {
      setErrorMessage("Username must be at least 2 characters long.");
      return false;
    }
    if (password.length < 5) {
      setErrorMessage("Password must be at least 5 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!checkValues()) return;
    setErrorMessage("");
    const existingUser = await doesUserExist(username);
    if (existingUser) {
      setErrorMessage(`User with name ${username} already exists.`);
      return;
    }

    try {
      let newUser = await registerUser(username, password);
      handleLogin(username);
      navigate("/forum");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      <div className="form">
        <div className="form-body">
          <div className="username">
            <label className="form__label">Username </label>
            <input
              className="form__input"
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e)}
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="password">
            <label className="form__label">Password </label>
            <input
              className="form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="footer">
          <button onClick={handleSubmit} type="submit" className="btn">
            Register
          </button>
        </div>
        <p>{errorMessage}</p>
      </div>
    </>
  );
}
