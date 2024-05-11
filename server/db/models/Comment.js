const knex = require('../knex');

class Comment {
  constructor({ id, resource_id, user_id, body }) {
    this.id = id;
    this.resource_id = resource_id;
    this.user_id = user_id;
    this.body = body;
  }

  // CRUD options later
}

module.exports = Comment;
