import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header
      id="nav-header"
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div class="navbar-item" id="logo">
          <NavLink to="/">
            <div>EAZE</div>
          </NavLink>
        </div>
      </div>
      <nav>
        <div>
          {currentUser ? (
            <ul class="navbar-start">
              <li class="navbar-item">
                <NavLink to={"/discussion"}>Discussions</NavLink>
              </li>
              <li class="navbar-item">
                <NavLink to="/resources">Resources</NavLink>
              </li>
              <li class="navbar-item">
                <NavLink to={`/users/${currentUser.id}`}>
                  {currentUser.username}
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul class="navbar-start">
              <li class="navbar-item">
                <NavLink to={"/discussion"}>Discussions</NavLink>
              </li>
              <li class="navbar-item">
                <NavLink to="/resources">Resources</NavLink>
              </li>
              <li class="navbar-end">
                <div class="buttons">
                  <div class="navbar-item">
                    <div class="button is-primary">
                      <NavLink to="/login">Login</NavLink>
                    </div>
                  </div>
                  <div class="navbar-item">
                    <div class="button is-light">
                      <NavLink to="/sign-up">
                        <strong className="active" id="sign-up-color">
                          Sign Up
                        </strong>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
