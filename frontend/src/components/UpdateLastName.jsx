import { useNavigate } from "react-router-dom";
import { updateLastName } from "../adapters/user-adapter";

export default function UpdateLastNameForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateLastName(Object.fromEntries(formData));
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    // We added the httpStatus as a custom cause in our error
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate("/");
    }
    console.log(event.target);

    setCurrentUser(user);
    event.target.reset();
  };

  return (
    <form
      className="box"
      onSubmit={handleSubmit}
      aria-labelledby="update-last-name-heading"
    >
      <h2 className="title is-4" id="update-last-name-heading">
        Change Your Last Name
      </h2>
      <div className="label">Current Last Name: {currentUser.last_name}</div>

      <input
        className="input"
        type="text"
        id="last_name"
        name="last_name"
        placeholder="New Last Name"
      />

      <input className="input" type="hidden" name="id" value={currentUser.id} />

      <button className="button medium-blue-slate mt-4 mb-2 has-text-white">
        Save
      </button>
    </form>
  );
}
