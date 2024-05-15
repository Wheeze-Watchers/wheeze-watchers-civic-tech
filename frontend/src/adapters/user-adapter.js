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
    })
  );

export const getAllUsers = async () => {
  const [users] = await fetchHandler(baseUrl);
  return users || [];
};

export const getUser = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateUsername = async ({ id, username }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }));
