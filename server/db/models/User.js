const knex = require("../knex");
const authUtils = require("../../utils/auth-utils");

class User {
  #passwordHash = null; // a private property

  // This constructor is NOT how a controller creates a new user in the database.
  // Instead, it is used by each of the User static methods to hide the hashed
  // password of user before sending user data to the client. Since #passwordHash
  // is private, only the isValidPassword instance method can access that value.
  constructor({
    id,
    first_name,
    last_name,
    email,
    username,
    password_hash,
    expert = false,
    profile_picture,
  }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.username = username;
    this.#passwordHash = password_hash;
    this.expert = expert;
    this.profile_picture = profile_picture;
  }

  // This instance method takes in a plain-text password and returns true if it matches
  // the User instance's hashed password.
  isValidPassword = async (password) =>
    authUtils.isValidPassword(password, this.#passwordHash);

  static async list() {
    const query = `SELECT * FROM "user"`;
    const { rows } = await knex.raw(query);
    // use the constructor to hide each user's passwordHash
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = `SELECT * FROM "user" WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = `SELECT * FROM "user" WHERE username = ?`;
    const { rows } = await knex.raw(query, [username]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async create(
    first_name,
    last_name,
    email,
    username,
    password,
    expert
  ) {
    // hash the plain-text password using bcrypt before storing it in the database
    const password_hash = await authUtils.hashPassword(password);

    const query = `INSERT INTO "user" (first_name, last_name, email, username, password_hash, expert)
    VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [
      first_name,
      last_name,
      email,
      username,
      password_hash,
      expert,
    ]);
    const user = rows[0];
    return new User(user);
  }

  // this is an instance method that we can use to update
  static async updateUsername(id, username) {
    // dynamic queries are easier if you add more properties
    const query = `
      UPDATE "user"
      SET username=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [username, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async updateEmail(id, email) {
    const query = `
      UPDATE "user"
      SET email=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [email, id]);
    const updatedEmail = rows[0];
    return updatedEmail ? new User(updatedEmail) : null;
  }

  static async updateProfilePicture(id, profile_picture) {
    const query = `
      UPDATE "user"
      SET profile_picture=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [profile_picture, id]);
    const updatedProfilePicture = rows[0];
    return updatedProfilePicture ? new User(updatedProfilePicture) : null;
  }

  static async updateFirstName(id, first_name) {
    const query = `
      UPDATE "user"
      SET first_name=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [first_name, id]);
    const updatedFirstName = rows[0];
    return updatedFirstName ? new User(updatedFirstName) : null;
  }

  static async updateLastName(id, last_name) {
    const query = `
      UPDATE "user"
      SET last_name=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [last_name, id]);
    const updatedLastName = rows[0];
    return updatedLastName ? new User(updatedLastName) : null;
  }
}

module.exports = User;
