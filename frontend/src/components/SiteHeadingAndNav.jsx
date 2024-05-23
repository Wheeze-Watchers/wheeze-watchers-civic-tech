import { NavLink, useParams } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";

export default function SiteHeadingAndNav() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
  };
  // import { NavLink, Link } from 'react-router-dom';
  // import { useContext } from 'react';
  // import CurrentUserContext from '../contexts/current-user-context';

  // export default function SiteHeadingAndNav() {
  // 	const { currentUser } = useContext(CurrentUserContext);

  return (
    <header
      id="nav-header"
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item" id="logo">
          <NavLink to="/" style={{ color: "#ffffff" }}>
            <div>
              <p>EAZE</p>
            </div>
          </NavLink>
        </div>
      </div>
      <nav>
        <div>
          {currentUser ? (
            <div className="navbar-start">
              <div className="navbar-item">
                <NavLink to={"/discussion"}>Discussions</NavLink>
              </div>
              <div className="navbar-item">
                <NavLink to="/resources">Resources</NavLink>
              </div>
              <div className="navbar-item">
                <div className="dropdown is-hoverable is-right">
                  <div className="dropdown-trigger">
                    <button
                      className="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    >
                      <strong style={{ color: "#736ced" }}>
                        {currentUser.username}
                      </strong>
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      <NavLink
                        className="dropdown-item"
                        to={`/users/${currentUser.id}`}
                        style={{ color: "#736ced" }}
                      >
                        <strong>Account</strong>
                      </NavLink>
                      <hr className="dropdown-divider" />
                      <NavLink
                        className="dropdown-item"
                        to={`/`}
                        onClick={handleLogout}
                        style={{ color: "#736ced" }}
                      >
                        <strong>Logout</strong>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-start">
              <div className="navbar-item">
                <NavLink to={"/discussion"}>Discussions</NavLink>
              </div>
              <div className="navbar-item">
                <NavLink to="/resources">Resources</NavLink>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <NavLink to="/login">Login</NavLink>
                </div>
                <div className="navbar-item">
                  <div className="button is-light">
                    <NavLink to="/sign-up">
                      <strong id="sign-up-color">Sign Up</strong>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
