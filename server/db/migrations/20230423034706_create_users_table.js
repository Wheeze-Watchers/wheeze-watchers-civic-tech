/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.dropTableIfExists('user_post')
  .dropTableIfExists('resource_comment')
  .dropTableIfExists('comment')
  .dropTableIfExists('resource')
  .dropTableIfExists('post')
  .dropTableIfExists('user')
  .createTable('user', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email').unique();
    table.string('username').notNullable().unique();
    table.string('password_hash').notNullable();
    table.boolean('expert');
  })
  .createTable('post', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.string('body');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable('user_post', (table) => {
    table.increments('id').primary();
    // table.foreign('user_id').references('user.id');
    table.integer('user_id').unique().references('user.id');
    // table.foreign('post_id').references('post.id');
    table.integer('post_id').unique().references('post.id');
  })
  .createTable('resource', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unique().references('user.id');
    table.string('URL');
  })
  .createTable('comment', (table) => {
    table.increments('id').primary();
    table.integer('resource_id').unique().references('resource.id');
    table.integer('user_id').unique().references('user.id');
    table.string('body');
    table.timestamp(true, true);
  })
  .createTable('resource_comment', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unique().references('resource.user_id');
    table.integer('resource_id').unique().references('resource.id');
    table.integer('comment_id').unique().references('comment.id');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  knex.schema.dropTable('user').dropTable('post').dropTable('user_post').dropTable('resource')
    .dropTable('comment')
    .dropTable('resource_comment');
};
