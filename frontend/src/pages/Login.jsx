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
    <div className="form-div">
      <form
        className="box field"
        onSubmit={handleSubmit}
        aria-labelledby="login-heading"
      >
        <div id="login-box">
          <h2 className="title" id="login-heading">
            Welcome Back!
          </h2>

          <label class="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              autoComplete="username"
              id="username"
              name="username"
            />
          </div>

          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            autoComplete="current-password"
            id="password"
            name="password"
          />

          <button className="button is-info" style={{ marginTop: "4px" }}>
            Log in!
          </button>
        </div>
        <span className="label">
          Don't have an account with us? <Link to="/sign-up">Sign Up!</Link>
        </span>
      </form>
      {!!errorText && <p>{errorText}</p>}
    </div>
  );
}
