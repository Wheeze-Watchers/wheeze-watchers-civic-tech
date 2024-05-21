export default function UserProfile({ currentUser, setCurrentUser }) {
  return (
    <div className="box">
      <h1 className="title is-3">Profile</h1>
      <figure className="image is-128x128">
        Profile Picture:
        <img
          className="is-rounded"
          src={currentUser.profile_picture}
          alt="Your Profile Picture"
        />
      </figure>
      <p>First Name: {currentUser.first_name}</p>
      {console.log("here", currentUser)}
      <p>Last Name: {currentUser.last_name}</p>
      <p>Email: {currentUser.email}</p>
      <p>Expert: {currentUser.expert ? "Yeah" : "Nope"}</p>
    </div>
  );
}
