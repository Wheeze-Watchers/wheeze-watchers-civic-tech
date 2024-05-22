import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateFirstName,
  updateLastName,
  updateProfilePic,
} from "../adapters/user-adapter";

export default function UserProfile({ currentUser, setCurrentUser }) {
  const [image, setImage] = useState("");
  const [urlName, setURLName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const ref = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateProfilePic(Object.fromEntries(formData));
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate("/") && console.warn(error.message);
    }

    setCurrentUser(user);
    event.target.reset();
  };

  // if (event.target.files.length > 0) {
  //   setURLName(event.target.files[0].name);
  //   currentUser.profile_picture = urlName;
  // }

  const handleImageClick = () => {
    ref.current.click();
  };

  const handleImageChange = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      setImage(event.target.files[0]);
    }

    const formData = new FormData(event.target);
    const [user, error] = await updateProfilePic(Object.fromEntries(formData));
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate("/") && console.warn(error.message);
    }
    setCurrentUser(user);
    event.target.reset();
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="field">
        <h1 className="title is-4">Profile</h1>
      </div>
      <div className="field">
        <label className="label">
          First Name:
          <input
            className="input"
            type="text"
            id="first_name"
            name="first_name"
            placeholder={currentUser.first_name}
          />
        </label>
        <label className="label">
          Last Name:
          <input
            className="input"
            type="text"
            id="last_name"
            name="last_name"
            placeholder={currentUser.last_name}
          />
        </label>
      </div>

      <div>
        <div className="field" onClick={handleImageClick}>
          <figure className="image is-128x128 ">
            <img
              className="is-rounded"
              src={currentUser.profile_picture}
              alt="Your Profile Picture"
            />
          </figure>
        </div>
        <input
          type="file"
          ref={ref}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* <div className="field">
        <label className="label" htmlFor="label">
          Choose a URL...
          <input
            className="input"
            type="url"
            onChange={handleURLChange}
            placeholder={currentUser.profile_picture}
          />
        </label>
      </div> */}

      {/* <div class="file has-name">
        <label class="file-label">
          <input class="file-input" type="file" onChange={handleFileChange} />
          <span class="file-cta">
            <i class="fas fa-upload"></i>
            <span class="file-label"> Choose a file… </span>
          </span>
          <span class="file-name">{currentUser.profile_picture}</span>
        </label>
      </div> */}

      <div className="field">
        <label className="label">
          {currentUser.expert ? "You are an Expert" : "You are a User"}
        </label>
      </div>
    </form>
  );
}
