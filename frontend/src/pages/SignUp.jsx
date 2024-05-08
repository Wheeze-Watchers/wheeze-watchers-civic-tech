import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
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
  const [expertCheck, setExpertCheck] = useState(null);
  // We could also use a single state variable for the form data:
  // const [formData, setFormData] = useState({ username: '', password: '' });
  // What would be the pros and cons of that?

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password)
      return setErrorText("Missing username or password");

    const [user, error] = await createUser({ username, password });
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

  const handleCheck = (event) => {
    setExpertCheck(event.target.value);
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        {label}
        <input type="checkbox" value={value} onChange={onChange} />
      </label>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-labelledby="create-heading"
      >
        <h2 id="create-heading">Sign Up</h2>

        <label htmlFor="firstName">First Name</label>
        <input
          autoComplete="off"
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleChange}
          value={firstName}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          autoComplete="off"
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleChange}
          value={lastName}
        />

        <label htmlFor="email">Email</label>
        <input
          autoComplete="off"
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <label htmlFor="expert">
          <Checkbox
            label="Are you an Expert? (Check if yes)"
            value={expertCheck}
            onChange={handleCheck}
          />
        </label>

        {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
        <label htmlFor="password-confirm">Password Confirm</label>
        <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
        */}

        <button>Sign Up Now!</button>
      </form>
      {!!errorText && <p>{errorText}</p>}
      <p>
        Already have an account with us? <Link to="/login">Log in!</Link>
      </p>
    </>
  );
}
