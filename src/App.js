import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Forum from "./routes/Forum.js";
import SubForum from "./routes/SubForum.js";
import FrontPage from "./routes/FrontPage.js";
import Navbar from "./components/Navbar";
import AddPost from "./routes/AddPost";
import Root from "./routes/FrontPage.js";
import Register from "./routes/Register";
import Login from "./routes/Login";
import { createContext } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { CookieContext } from "./hooks/CookieContext.js";

function App() {
  const UserContext = createContext();
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  function handleLogin(username) {
    setCookie("user", username, { path: "/" });
  }

  function handleLogOut() {
    removeCookies("user", { path: "/" });
  }

  return (
    <>
      <CookiesProvider>
        <div>
          {cookies.user ? <h1>logged in: {cookies.user}</h1> : <h1>no user</h1>}
        </div>

        <CookieContext.Provider value={{ handleLogin, handleLogOut, cookies }}>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<FrontPage />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/subforum" element={<SubForum />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route exact path="/subforum/:id" element={<SubForum />} />
          </Routes>
          {/* <button onClick={()=>handleLogin("joho")}>Log in</button>
    <button onClick={()=>handleLogOut()}>Log out</button> */}
        </CookieContext.Provider>
      </CookiesProvider>
    </>
  );
}

export default App;
