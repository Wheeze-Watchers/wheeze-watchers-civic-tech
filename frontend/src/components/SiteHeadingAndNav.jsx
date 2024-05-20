import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';

export default function SiteHeadingAndNav() {
	const { currentUser } = useContext(CurrentUserContext);

  return (
    <header
      id="nav-header"
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item" id="logo">
          <NavLink to="/" style={{ color: "#ff8d09" }}>
            <div>
              <p>EAZE</p>
            </div>
          </NavLink>
        </div>
      </div>
      <nav>
        <div>
          {currentUser ? (
            <ul className="navbar-start">
              <li className="navbar-item">
                <NavLink to={"/discussion"}>Discussions</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/resources">Resources</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to={`/users/${currentUser.id}`}>
                  {currentUser.username}
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-start">
              <li className="navbar-item">
                <NavLink to={"/discussion"}>Discussions</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/resources">Resources</NavLink>
              </li>
              <li className="navbar-end">
                <div className="buttons">
                  <div className="navbar-item">
                    <div className="button is-primary">
                      <NavLink to="/login">Login</NavLink>
                    </div>
                  </div>
                  <div className="navbar-item">
                    <div className="button is-light">
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
