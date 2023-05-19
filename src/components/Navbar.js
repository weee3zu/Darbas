import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./css/Navbar.css";
import { CookieContext } from "../hooks/CookieContext.js";
import { useContext } from "react";

export default function Navbar() {
  const { handleLogin, handleLogOut, cookies } = useContext(CookieContext);

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        REDDITIO
      </Link>
      <ul>
        <CustomLink to="/forum">Forums</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        {cookies.user ? (
          <li className="lielm" onClick={handleLogOut}>
            LogOut
          </li>
        ) : (
          <>
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/register">Register</CustomLink>
          </>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
