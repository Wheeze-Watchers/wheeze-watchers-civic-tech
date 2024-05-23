import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHandler, getPatchOptions, getPostOptions } from "../utils";
import CurrentUserContext from "../contexts/current-user-context";

export default function () {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
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
      const response = await fetchHandler("/api/posts/discussion");
      if (response) {
        setPost(response[0]);
      }
    };
    fetchData();
  }, [postToggle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const response = await fetch(
        `/api/posts/discussion`,
        getPostOptions({
          title: postTitle,
          body: postBody,
          user_id: currentUser.id,
        })
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setPostToggle(!postToggle);
      setPostTitle("");
      setPostBody("");
    } else {
      navigate("/login");
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
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const openEditModal = (id, text, body) => {
    setEditPostId(id);
    setEditTitle(text);
    setEditBody(body);
    editModalRef.current.showModal();
  };

  const closeEditModal = () => {
    setEditPostId(null);
    editModalRef.current.close();
  };

  const handleEdit = async () => {
    await fetchHandler(
      `api/posts/discussion/${editPostId}`,
      getPatchOptions({ id: editPostId, title: editTitle, body: editBody })
    );
    closeEditModal();
    setPostToggle(!postToggle);
  };

  return (
    <>
      <form
        className="box mt-6"
        onSubmit={handleSubmit}
        aria-labelledby="comment-heading"
      >
        <label className="label" htmlFor="comment">
          Add post
        </label>
        <input
          className="input"
          type="text"
          id="title"
          name="title"
          placeholder="Add Title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <textarea
          className="input"
          type="text"
          id="comment"
          name="comment"
          placeholder="Add Text"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button className="button medium-blue-slate has-text-white has-text-weight-semibold">Add</button>
      </form>
      <div className="topic-container">
        {post &&
          post.map((val) => (
            <div key={val.id} className="card">
              <div className="card-content">
                <div className="title-body center">
                  <img src={val.user.profile_picture} width="100" />
                  <p className="title is-5 pt-2">{val.user.username}</p>
                </div>
                <div className="title-body pl-5">
                  <h1 className="title is-3">{val.title}</h1>
                  <h3>{val.body}</h3>
                </div>
              </div>
              {currentUser && currentUser.id === val.user_id && (
                <div className="button-container">
                  <button
                    type="button"
                    className="button is-danger has-text-weight-semibold"
                    onClick={() => handleDelete(val.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="button is-info has-text-weight-semibold"
                    onClick={() => openEditModal(val.id, val.title, val.body)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      <dialog className="edit-modal" ref={editModalRef}>
        <h3 className="label">Title</h3>
        <input
          className="input"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <h3 className="label">Text</h3>
        <input
          className="input"
          type="text"
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />
        <button className="button is-info" type="button" onClick={handleEdit}>
          Save
        </button>
        <button
          className="button is-danger"
          type="button"
          onClick={closeEditModal}
        >
          Cancel
        </button>
      </dialog>

      <dialog className="edit" ref={editModalRef}>
        <div>
          <h3>Title</h3>
          <input
            className="input"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <h3>Text</h3>
          <textarea
            id="comment"
            className="input"
            type="text"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button className="button is-info" type="button" onClick={handleEdit}>
            Save
          </button>
          <button
            className="button is-danger"
            type="button"
            onClick={closeEditModal}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
}
