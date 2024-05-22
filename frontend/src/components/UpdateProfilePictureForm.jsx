import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfilePic } from "../adapters/user-adapter";

export default function UpdateProfilePictureForm({
  currentUser,
  setCurrentUser,
}) {
  const [image, setImage] = useState("");
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

  const handleImageClick = () => {
    ref.current.click();
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      setImage(event.target.files[0]);
    }
  };

  return (
    <>
      <form
        className="box field"
        onSubmit={handleSubmit}
        aria-labelledby="update-profile-picture-heading"
      >
        <h2 className="title is-4" id="update-profile-picture-heading">
          Change Profile Picture
        </h2>

        <div>
          <div className="field" onClick={handleImageClick}>
            <figure className="image is-128x128 ">
              {image ? (
                <img
                  className="is-rounded"
                  src={URL.createObjectURL(image)}
                  alt="Your Profile Picture"
                />
              ) : (
                <img
                  className="is-rounded"
                  src={currentUser.profile_picture}
                  alt="Your Profile Picture"
                />
              )}
            </figure>
          </div>
          <input
            className="input"
            type="file"
            id="profile_picture"
            name="profile_picture"
            ref={ref}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <input
          className="input"
          type="hidden"
          name="id"
          value={currentUser.id}
        />

        <button className="button is-info">Save</button>
      </form>
    </>
  );
}
