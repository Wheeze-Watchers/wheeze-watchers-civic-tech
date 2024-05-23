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
        Change Your Email
      </h2>
      <div className="label">Current Email: {currentUser.email}</div>

      <input
        className="input"
        type="email"
        id="email"
        name="email"
        placeholder="New Email"
      />

      <input className="input" type="hidden" name="id" value={currentUser.id} />

      <button className="button medium-blue-slate mt-4 mb-2 has-text-white">
        Save
      </button>
    </form>
  );
}
