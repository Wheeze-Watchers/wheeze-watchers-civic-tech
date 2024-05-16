import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";

export default function UpdatePasswordForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateUsername(Object.fromEntries(formData));
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
    <form onSubmit={handleSubmit} aria-labelledby="update-password-heading">
      <h2 id="update-password-heading">Update Password</h2>
      <label htmlFor="password">New Password</label>
      <input type="text" id="password" name="password" />
      <input type="hidden" name="id" value={currentUser.id} />

      <button>Update Password</button>
    </form>
  );
}
