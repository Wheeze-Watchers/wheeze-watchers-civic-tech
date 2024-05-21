import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
// import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import UpdateProfilePictureForm from "../components/UpdateProfilePictureForm";
import UpdateEmailForm from "../components/UpdateEmailForm";
import UserProfile from "../components/UserProfile";

export default function UserPage() {
  // const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };
    loadUser();
  }, [id]);

  // const handleLogout = async () => {
  //   logUserOut();
  //   setCurrentUser(null);
  //   navigate("/");
  // };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  console.log(currentUser);

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  return (
    <>
      {/* <h1 className="title">{profileUsername}'s profile</h1> */}
      <h1 className="title is-1">Account</h1>
      <div className="subtitle">Update your account information here</div>
      {/* <div id="logout-div">
        {!!isCurrentUserProfile && (
          <button className="button is-dark" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </div> */}
      {!!isCurrentUserProfile && (
        <>
          <UserProfile
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          {/* <UpdateProfilePictureForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          /> */}
          {/* <UpdateEmailForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          /> */}
          <UpdateUsernameForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          {/* <UpdatePasswordForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          /> */}
        </>
      )}
    </>
  );
}
