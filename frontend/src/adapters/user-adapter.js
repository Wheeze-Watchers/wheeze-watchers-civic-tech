// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = "/api/users";

export const createUser = async ({
  first_name,
  last_name,
  email,
  username,
  password,
  expert,
  profile_picture,
}) =>
  fetchHandler(
    baseUrl,
    getPostOptions({
      first_name,
      last_name,
      email,
      username,
      password,
      expert,
      profile_picture,
    })
  );

export const getAllUsers = async () => {
  const [users] = await fetchHandler(baseUrl);
  return users || [];
};

export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateUsername = async ({ id, username }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }));

export const updatePassword = async ({ id, password }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, password }));

export const updateEmail = async ({ id, email }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, email }));

export const updateProfilePic = async ({ id, profile_picture }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, profile_picture }));
