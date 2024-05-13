import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import SignUpPage from "./SignUp";
import { fetchHandler } from "../utils";

export default function () {
    const [topicTitle, setTopicTitle] = useState('')
    const [discussionInfo, setDiscussionInfo] = useState('')
    const { currentUser } = useContext(CurrentUserContext)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetchHandler('/api/posts/discussion');
          if (response) {
            setTopicTitle(response[0][2].title)
            setDiscussionInfo(response[0][2].body)
            }
        };
        fetchData();
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        currentUser
        ? <>{console.log('add comment')}</>
        : navigate('/sign-up')
    };

  return (
    <>
    <div className="topic-container">
        <h1>{topicTitle}</h1>
        <h3>{discussionInfo}</h3>
    </div>

    {/* Input a comment */}
    <form onSubmit={handleSubmit} aria-labelledby="comment-heading">
        <label htmlFor="comment">Comment</label>
        <input type="text" id="comment" name="comment" />
        <button>Add</button>
    </form>

    {/* List of user comments */}
    <div className="comment-container">
    <ul>
        <li>username ============ user comment</li>
    </ul>
    </div>

    <footer>
        random stuff in the footer
    </footer>
    </>
  );
}
