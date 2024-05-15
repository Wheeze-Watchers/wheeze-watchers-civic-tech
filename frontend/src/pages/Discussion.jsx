import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import SignUpPage from "./SignUp";
import { fetchHandler, getPatchOptions } from "../utils";

export default function () {
    const [post, setPost] = useState([]);
    const [editPostId, setEditPostId] = useState(null);
    const [editText, setEditText] = useState("");
    const editModalRef = useRef(null);
    const [postToggle, setPostToggle] = useState(false);
    
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchHandler('/api/posts/discussion');
            if (response) {
                setPost(response[0]);
            }
        };
        fetchData();
    }, [postToggle]);

    const handleSubmit = (e) => {
        e.preventDefault();
        currentUser
        ? console.log('add comment')
        : navigate('/sign-up');
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/posts/discussion/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setPost(post.filter((post) => post.id !== id));
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
        }
    };

    const openEditModal = (id, text) => {
        setEditPostId(id);
        setEditText(text);
        editModalRef.current.showModal();
    };

    const closeEditModal = () => {
        editModalRef.current.close();
    }

    const handleEdit = async () => {
      fetchHandler(`api/posts/discussion/${editPostId}`, getPatchOptions({ id: editPostId, body: editText }));
        closeEditModal();
        setPostToggle(!postToggle)
    };

    return (
        <>
            <form onSubmit={handleSubmit} aria-labelledby="comment-heading">
                <label htmlFor="comment">Add post</label>
                <input type="text" id="comment" name="comment" />
                <button>Add</button>
            </form>

            <div className="topic-container">
                {post.map((val) => (
                    <div key={val.id}>
                        <h1>{val.title}</h1>
                        <h3>{val.body}</h3>
                        <button type='button' onClick={() => handleDelete(val.id)}>delete</button>
                        <button type='button' onClick={() => openEditModal(val.id, val.body)}>edit</button>
                    </div>
                ))}
            </div>

            <dialog className="edit-modal" ref={editModalRef}>
                <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleEdit}>Save</button>
                <button onClick={closeEditModal}>Cancel</button>
            </dialog>
        </>
    );
}
