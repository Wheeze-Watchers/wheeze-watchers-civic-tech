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
      <form
        className="box field mt-6"
        onSubmit={handleSubmit}
        aria-labelledby="login-heading"
      >
        <div>
          <h2 className="title mt-4 mb-4">Welcome Back!</h2>

          <div className="control mt-4 mb-4">
            <input
              className="input"
              type="text"
              autoComplete="username"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>

          <div className="control mt-4 mb-4">
            <input
              className="input"
              type="password"
              autoComplete="current-password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button className="button is-fullwidth tropical-indigo mt-4 mb-4">
            Log in!
          </button>
        </div>
        <span className="label has-text-centered mt-2">
          Don't have an account with us? <Link to="/sign-up">Sign Up!</Link>
        </span>
      </form>
      {!!errorText && <p>{errorText}</p>}
    </>
  );
}
