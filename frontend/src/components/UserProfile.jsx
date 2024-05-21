export default function UserProfile({ currentUser, setCurrentUser }) {
  return (
    <div className="box">
      <h1 className="title is-4">Profile</h1>
      <div className="">
        <div>First Name: {currentUser.first_name}</div>
        <div>Last Name: {currentUser.last_name}</div>
      </div>
      <figure className="image is-128x128">
        <img
          className="is-rounded"
          src={currentUser.profile_picture}
          alt="Your Profile Picture"
        />
      </figure>
      <div>Email: {currentUser.email}</div>
      <div>Expert: {currentUser.expert ? "Yes" : "No"}</div>
    </div>
  );
}
