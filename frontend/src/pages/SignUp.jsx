import { useContext, useState } from "react";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expert, setExpert] = useState(false);
  // We could also use a single state variable for the form data:
  // const [formData, setFormData] = useState({ username: '', password: '' });
  // What would be the pros and cons of that?

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!firstName) return setErrorText("Missing first name");

    if (!lastName) return setErrorText("Missing last name");

    if (!email) return setErrorText("Missing email");

    if (!username) return setErrorText("Missing username");

    if (!password) return setErrorText("Missing password");

    const [user, error] = await createUser({
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
      expert,
    });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastname(value);
    if (name === "email") setEmail(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>
      <form
        className="box field mt-6"
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-labelledby="create-heading"
      >
        <h2 className="title mt-3 mb-3">Sign Up</h2>

        <label className="label checkbox">
          Are you an Expert? (Check if you are)
        </label>
        <input
          type="checkbox"
          value={expert}
          onChange={() => setExpert(!expert)}
        />

        <input
          className="input mt-4"
          autoComplete="off"
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleChange}
          value={firstName}
          placeholder="First Name"
        />

        <input
          className="input mt-4"
          autoComplete="off"
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleChange}
          value={lastName}
          placeholder="Last Name"
        />

        <input
          className="input mt-4"
          autoComplete="off"
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
          placeholder="Email"
        />

        <input
          className="input mt-4"
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
          placeholder="Username"
        />

        <input
          className="input mt-4 mb-4"
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
          placeholder="Password"
        />

        {console.log(expert)}

        {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
          <label htmlFor="password-confirm">Password Confirm</label>
          <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
          */}

        <button
          className="button is-fullwidth tropical-indigo mt-4 mb-4"
          type="submit"
        >
          Sign Up Now!
        </button>
        <div>
          <span className="label has-text-centered mt-2">
            Already have an account with us?{" "}
            <NavLink to="/login">Log in!</NavLink>
          </span>
        </div>
      </form>
      {!!errorText && <p>{errorText}</p>}
    </>
  );
}
