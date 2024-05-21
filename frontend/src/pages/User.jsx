import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import UserProfile from "../components/UserProfile";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import UpdateProfilePictureForm from "../components/UpdateProfilePictureForm";
import UpdateEmailForm from "../components/UpdateEmailForm";

export default function UserPage() {
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

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  console.log(currentUser);

  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  return (
    <div className="box">
      <h1 className="title is-1">Account</h1>
      <div className="subtitle">Update your account information here</div>
      {!!isCurrentUserProfile && (
        <div>
          <UserProfile
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <UpdateUsernameForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </div>
      )}
    </div>
  );
}
