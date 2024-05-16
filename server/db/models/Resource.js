const knex = require('../knex');

class Resource {
  constructor({ id, user_id, url }) {
    this.id = id;
    this.user_id = user_id;
    this.url = url;
  }

  static async getAllResource() {
    const query = `SELECT * FROM resource`;
    const { rows } = await knex.raw(query);
    return rows.map((resource) => new Resource(resource));
  }

  static async findResource(id) {
    const query = `SELECT * FROM resource WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const resource = rows[0];
    return resource ? new Resource(resource) : null;
  }

  static async createResource(url) {
    const query = `
        INSERT INTO resource (url)
        VALUES (?) 
        RETURNING *`;
    const { rows } = await knex.raw(query, [url]);
    const resource = rows[0];
    return new Resource(resource);
  }

  static async updateResource(id, url) {
    const query = `
        UPDATE resource
        SET url=?
        WHERE id=?
        RETURNING *`;
    const { rows } = await knex.raw(query, [url, id]);
    const updatetdResource = rows[0];
    return updatetdResource ? new Resource(updatetdResource) : null;
  }

  static async deleteResource(id) {
    const query = `
        DELETE FROM resource
        WHERE id=?
        RETURNING *`;
    const { rows } = await knex.raw(query, [id]);
    const resource = rows[0];
    return resource ? new Resource(resource) : null;
  }
}

module.exports = Resource;