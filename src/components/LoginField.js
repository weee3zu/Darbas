import { useContext } from "react";
import { CookieContext } from "../hooks/CookieContext.js";
import React, { useState } from "react";
import { checkCredentials } from "../api/Auth.js";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, handleLogOut } = useContext(CookieContext);
  const [errorLabel, setErrorLabel] = useState("");

  function handleSubmit() {
    if (checkCredentials(username, password)) {
      handleLogin(username);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" />
        <p>{errorLabel}</p>
      </form>
    </>
  );
}

export default LoginPage;
