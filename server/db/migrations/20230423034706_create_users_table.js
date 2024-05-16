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
    table.string('profile_picture').defaultTo('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  })
  .createTable('post', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.string('body');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('user');
  })
  .createTable('resource', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unique().references('user.id');
    table.string('title');
    table.string('body');
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
