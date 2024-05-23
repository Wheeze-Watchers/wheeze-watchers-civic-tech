import { useNavigate } from "react-router-dom";
// import { updatePassword } from "../adapters/user-adapter";

export default function UpdatePasswordForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updatePassword(Object.fromEntries(formData));
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    // We added the httpStatus as a custom cause in our error
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
      aria-labelledby="update-password-heading"
    >
      <h2 className="title is-4" id="update-password-heading">
        Change Password
      </h2>
      <label className="label" htmlFor="password">
        Current Password
      </label>
      <input
        className="input"
        type="password"
        autoComplete="current-password"
        id="password"
        name="password"
      />
      <label className="label" htmlFor="password">
        New Password
      </label>
      <input
        className="input"
        type="text"
        id="new-password"
        name="new-password"
      />
      <input type="hidden" name="id" value={currentUser.id} />

      <button className="button is-info has-text-weight-semibold">Save</button>
    </form>
  );
}
