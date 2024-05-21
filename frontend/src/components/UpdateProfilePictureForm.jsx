import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfilePic } from "../adapters/user-adapter";

export default function UpdateProfilePictureForm({
  currentUser,
  setCurrentUser,
}) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateProfilePic(Object.fromEntries(formData));
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
    <>
      <form
        className="box field"
        onSubmit={handleSubmit}
        aria-labelledby="update-profile-picture"
      >
        <h2 className="title is-4" id="update-profile-picture">
          Change Profile Picture
        </h2>

        <div className="image is-128x128">
          <img
            className="is-rounded"
            src={currentUser.profile_picture}
            alt="Your Profile Picture"
          />
        </div>

        <input
          className="input"
          type="hidden"
          name="id"
          value={currentUser.id}
        />

        <button className="button is-info">Select New Picture</button>
      </form>
    </>
  );
}
