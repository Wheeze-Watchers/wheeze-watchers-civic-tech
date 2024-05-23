import { useNavigate } from "react-router-dom";
import { updateFirstName } from "../adapters/user-adapter";

export default function UpdateFirstNameForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateFirstName(Object.fromEntries(formData));
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
      aria-labelledby="update-first-name-heading"
    >
      <h2 className="title is-4" id="update-first-name-heading">
        Change Your First Name
      </h2>

      <div className="label">Current First Name: {currentUser.first_name}</div>

      {/* <label className="label" htmlFor="first_name">
        New First Name
      </label> */}
      <input
        className="input"
        type="text"
        id="first_name"
        name="first_name"
        placeholder='"New Last Name"'
      />

      <input className="input" type="hidden" name="id" value={currentUser.id} />

      <button className="button is-info">Save</button>
    </form>
  );
}
