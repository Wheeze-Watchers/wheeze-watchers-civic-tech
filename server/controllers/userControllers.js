const { isAuthorized } = require("../utils/auth-utils");
const User = require("../db/models/User");

exports.createUser = async (req, res) => {
  const { first_name, last_name, email, username, password, expert } = req.body;

  // TODO: check if username is taken, and if it is what should you return?

  const user = await User.create(
    first_name,
    last_name,
    email,
    username,
    password,
    expert
  );
  req.session.userId = user.id;

  res.send(user);
};

exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) return res.sendStatus(404);

  res.send(user);
};

exports.updateUser = async (req, res) => {
  const { first_name, last_name, email, username, profile_picture } = req.body;
  const { id } = req.params;

  // Not only do users need to be logged in to update a user, they
  // need to be authorized to perform this action for this particular
  // user (users should only be able to change their own profiles)

  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  let updatedUser = {};

  if (first_name) {
    updatedUser = await User.updateFirstName(id, first_name);
  }

  if (last_name) {
    updatedUser = await User.updateLastName(id, last_name);
  }

  if (email) {
    updatedUser = await User.updateEmail(id, email);
  }

  if (username) {
    updatedUser = await User.updateUsername(id, username);
  }

  if (profile_picture) {
    updatedUser = await User.updateProfilePicture(id, profile_picture);
  }

  if (!updatedUser) return res.sendStatus(404);
  res.send(updatedUser);
};
