import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import UpdateEmailForm from "../components/UpdateEmailForm";
import UpdateProfilePictureForm from "../components/UpdateProfilePictureForm";
import UpdateFirstNameForm from "../components/UpdateFirstNameForm";
import UpdateLastNameForm from "../components/UpdateLastName";

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
    <div className="champagne-pink">
      <div className="m-6 has-text-centered">
        <h1 className="title is-1 mb-2">Account</h1>
        <h2 className="subtitle">Update your account information here</h2>
      </div>
      {!!isCurrentUserProfile && (
        <div>
          <div className="columns is-vcentered">
            <div className="column">
              <div className="box has-text-centered is-size-4 account-type is-align-content-center">
                <strong className="medium-blue-slate-text">
                  {" "}
                  {currentUser.expert ? "Expert Account" : "User Account"}
                </strong>
              </div>
              <UpdateProfilePictureForm
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
            <div className="column">
              <UpdateFirstNameForm
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
              <UpdateLastNameForm
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
            <div className="column">
              <UpdateUsernameForm
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
              <UpdateEmailForm
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
