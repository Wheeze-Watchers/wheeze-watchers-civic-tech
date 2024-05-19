import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData));
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <>
      <form onSubmit={handleSubmit} aria-labelledby="login-heading">
        <div id="login-box">
          <h2 id="login-heading">Welcome Back!</h2>

          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="text"
                autoComplete="username"
                id="username"
                name="username"
              />
              {/* <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span> */}
            </div>
            {/* <p class="help is-success">This username is available</p> */}
          </div>

          {/* <div className="field">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              id="username"
              name="username"
            />
          </div> */}

          <label htmlFor="password">Password</label>
          <input
            class="input"
            type="password"
            autoComplete="current-password"
            id="password"
            name="password"
          />

          <button>Log in!</button>
        </div>
      </form>
      {!!errorText && <p>{errorText}</p>}
      <span>
        Don't have an account with us? <Link to="/sign-up">Sign Up!</Link>
      </span>
    </>
  );
}
