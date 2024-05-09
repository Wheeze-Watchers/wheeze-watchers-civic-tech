import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import SignUpPage from "./SignUp";

export default function () {
    const { currentUser } = useContext(CurrentUserContext)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        currentUser
        ? <>{console.log('add comment')}</>
        : navigate('/sign-up')
    };

  return (
    <>
    <div className="topic-container">
        <h1>{/*title of discussion from DB*/}Let's Discuss!</h1>
        <h3>{/*bio of discussion from DB body column*/}</h3>
    </div>

    {/* Input a comment */}
    <form onSubmit={handleSubmit} aria-labelledby="comment-heading">
        <label htmlFor="comment">Comment</label>
        <input type="text" id="comment" name="comment" />
        <button>Add</button>
    </form>

    {/* List of user comments */}
    <ul>
        <li>user comment</li>
    </ul>

    <footer>
        random stuff in the footer
    </footer>
    </>
  );
}
