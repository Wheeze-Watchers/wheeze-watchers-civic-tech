/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema
    // .dropTableIfExists('comment')
    .dropTableIfExists("post")
    .dropTableIfExists("resource")
    .dropTableIfExists("user")
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("email");
      table.string("username").notNullable().unique();
      table.string("password_hash").notNullable();
      table.boolean("expert");
      table
        .string("profile_picture")
        .defaultTo(
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        );
    })
    .createTable("post", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.text("body");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.integer("user_id");
      table.foreign("user_id").references("id").inTable("user");
    })
    .createTable("resource", (table) => {
      table.increments("id").primary();
      table.string("url").unique();
      table.integer("user_id");
      table.foreign("user_id").references("id").inTable("user");
    });
// .createTable('comment', (table) => {
//   table.increments('id').primary();
//   table.integer('resource_id');
//   table.foreign('resource_id').references('id').inTable('resource');
//   table.integer('user_id');
//   table.foreign('user_id').references('id').inTable('user');
//   table.string('body');
//   table.timestamp(true, true);
// });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) =>
  knex.schema
    // .dropTableIfExists('comment')
    .dropTableIfExists("post")
    .dropTableIfExists("resource")
    .dropTableIfExists("user");
