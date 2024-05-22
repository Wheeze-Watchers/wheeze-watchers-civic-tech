import { useNavigate } from "react-router-dom";
import { updateEmail } from "../adapters/user-adapter";

export default function UpdateEmailForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateEmail(Object.fromEntries(formData));

    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate("/");
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return (
    <form
      className="box"
      onSubmit={handleSubmit}
      aria-labelledby="email-heading"
    >
      <h2 className="title is-4" id="email-heading">
        Change Email
      </h2>
      <div className="label">Current Email: {currentUser.email}</div>
      <label className="label" htmlFor="username">
        New Email
      </label>
      <input className="input" type="email" id="email" name="email" />

      <input className="input" type="hidden" name="id" value={currentUser.id} />

      <button className="button is-info">Save</button>
    </form>
  );
}
