const knex = require('../knex')

class Post {
    //add defualt time for timestamp, a user cannot enter the time of the post
    constructor({ id, title, body, timeStamp }) {
        this.id = id;
        this.title = title;
        this. body = body;
        this.timeStamp = timeStamp
    }

    static async createPost(title, body) {
        const query = `
        INSERT INTO post (title, body)
        VALUES (?, ?) 
        RETURNING *`
        const { rows } = await knex.raw(query, [title, body])
        const post = rows[0]
        return new Post(post)
    }

    //update post
    static async updateBody(id, body) {
        const query = `
        UPDATE post
        SET body=?
        WHERE id=?
        RETURNING *`
        const { rows } = await knex.raw(query, [body, id])
        const updatetdPost = rows[0];
        return updatetdPost ? new Post(updatetdPost) : null;
    }

    static async updateTitle(id, title) {
        const query = `
        UPDATE post
        SET title=?
        WHERE id=?
        RETURNING *`
        const { rows } = await knex.raw(query, [title, id])
        const updatetdTitle = rows[0];
        return updatetdTitle ? new Post(updatetdTitle) : null;
    }

    static async deletePost(id) {
        const query = `
        DELETE FROM post
        WHERE id=?`
        const { rows } = await knex.raw(query, [id])
        // return something
    }

}

module.exports = Post;