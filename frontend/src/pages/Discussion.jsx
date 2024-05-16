import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHandler, getPatchOptions, getPostOptions } from "../utils";
import CurrentUserContext from "../contexts/current-user-context";

export default function () {
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [post, setPost] = useState([]);
    const [editPostId, setEditPostId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentUser) {
            const response = await fetch(`/api/posts/discussion`, getPostOptions({ title: postTitle, body: postBody, user_id: currentUser.id}));
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setPostToggle(!postToggle)
            setPostTitle('');
            setPostBody('');

        } else {
            navigate('/login');
        }
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

    const openEditModal = (id, text, body) => {
        setEditPostId(id);
        setEditTitle(text);
        setEditBody(body);
        editModalRef.current.showModal();
    };

    const closeEditModal = () => {
        setEditPostId(null)
        editModalRef.current.close();
    }

    const handleEdit = async () => {
        await fetchHandler(`api/posts/discussion/${editPostId}`, getPatchOptions({ id: editPostId, title: editTitle, body: editBody }));
        closeEditModal();
        setPostToggle(!postToggle)
    };

    return (
        <>
            <form onSubmit={handleSubmit} aria-labelledby="comment-heading">
                <label htmlFor="comment">Add post</label>
                <input type="text" id="title" name="title" placeholder="Add Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                <input type="text" id="comment" name="comment" placeholder="Add Text" value={postBody} onChange={(e) => setPostBody(e.target.value)} />
                <button>Add</button>
            </form>

            <div className="topic-container">
                {post && post.map((val) => (
                    <div key={val.id}>
                        <img src={val.user.profile_picture} width='100'/>
                        <h1>{val.title}</h1>
                        <h3>{val.body}</h3>
                        {(currentUser && currentUser.id === val.user_id) && <>
                            <button type='button' onClick={() => handleDelete(val.id)}>delete</button>
                            <button type='button' onClick={() => openEditModal(val.id, val.title, val.body)}>edit</button>
                            </>
                        }
                    </div>
                ))}
            </div>

            <dialog className="edit-modal" ref={editModalRef}>
                <h3>Title</h3>
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <h3>Text</h3>
                <input
                    type="text"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="button" onClick={handleEdit}>Save</button>
                <button type="button" onClick={closeEditModal}>Cancel</button>
            </dialog>
        </>
    );
}
