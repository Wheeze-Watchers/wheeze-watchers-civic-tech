// import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfilePic } from "../adapters/user-adapter";

export default function UpdateProfilePictureForm({
  currentUser,
  setCurrentUser,
}) {
  // const [image, setImage] = useState("");
  // const ref = useRef(null);
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

  // const handleImageClick = () => {
  //   ref.current.click();
  // };

  // const handleImageChange = (event) => {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log(file);
  //     // console.log(JSON.stringify(file));
  //     setImage(file);
  //     console.log("image", image);
  //   }
  // };

  return (
    <>
      <form
        className="box field"
        onSubmit={handleSubmit}
        aria-labelledby="update-profile-picture-heading"
      >
        <h2 className="title is-4 mb-4" id="update-profile-picture-heading">
          Change Your Profile Picture
        </h2>

        <div className="field">
          <figure className="image is-128x128">
            <img
              className="is-rounded"
              src={currentUser.profile_picture}
              alt="My Profile Picture"
            />
          </figure>

          <input
            className="input mt-4 mb-2"
            type="text"
            id="profile_picture"
            name="profile_picture"
            placeholder="Enter a Picture URL"
          />
        </div>

        {/* <div>
          <div className="field" onClick={handleImageClick}>
            <figure className="image is-128x128">
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
        </div> */}

        <input
          className="input"
          type="hidden"
          name="id"
          value={currentUser.id}
        />

        <button className="button medium-blue-slate has-text-white">
          Save
        </button>
      </form>
    </>
  );
}
