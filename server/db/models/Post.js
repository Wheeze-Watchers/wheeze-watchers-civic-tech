const knex = require('../knex');

class Post {
  constructor({id, title, body, created_at, user_id, first_name, last_name, email, username, expert, profile_picture}) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.created_at = created_at;
    this.user_id = user_id;
    this.user = {
      first_name,
      last_name,
      email,
      username,
      expert, 
      profile_picture
    };
  }

  static async getAllPost() {
    const query = `
    SELECT 
      post.id,
      post.title,
      post.body,
      post.created_at,
      post.user_id,
      "user".first_name,
      "user".last_name,
      "user".email,
      "user".username,
      "user".expert,
      "user".profile_picture
    FROM post
    JOIN "user" 
    ON post.user_id = "user".id 
    ORDER BY post.created_At DESC
  `;
    const { rows } = await knex.raw(query);
    // use the constructor to hide each user's passwordHash
    return rows.map((post) => new Post(post));
  }

  static async findPost(id) {
    const query = `SELECT * FROM post WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const post = rows[0];
    return post ? new Post(post) : null;
  }

  static async createPost(title, body, user_id) {
    const query = `
        INSERT INTO post (title, body, user_id)
        VALUES (?, ?, ?) 
        RETURNING *`;
    const { rows } = await knex.raw(query, [title, body, user_id]);
    const post = rows[0];
    return new Post(post);
  }

  static async updateBody(id, body) {
    const query = `
        UPDATE post
        SET body=?
        WHERE id=?
        RETURNING *`;
    const { rows } = await knex.raw(query, [body, id]);
    const updatetdPost = rows[0];
    return updatetdPost ? new Post(updatetdPost) : null;
  }

  static async updateTitle(id, title) {
    const query = `
        UPDATE post
        SET title=?
        WHERE id=?
        RETURNING *`;
    const { rows } = await knex.raw(query, [title, id]);
    const updatetdTitle = rows[0];
    return updatetdTitle ? new Post(updatetdTitle) : null;
  }

  static async deletePost(id) {
    const query = `
        DELETE FROM post
        WHERE id=?
        RETURNING *`;
    const { rows } = await knex.raw(query, [id]);
    const post = rows[0];
    return post ? new Post(post) : null;
  }
}

module.exports = Post;
