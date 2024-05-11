const knex = require('../knex');

class Post {
  constructor({ id, title, body, timeStamp }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.timeStamp = timeStamp;
  }

  static async getAllPost() {
    const query = `SELECT * FROM post`;
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

  static async createPost(title, body) {
    const query = `
        INSERT INTO post (title, body)
        VALUES (?, ?) 
        RETURNING *`;
    const { rows } = await knex.raw(query, [title, body]);
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
