const User = require('../models/User');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.seed = async (knex) => {
//   // Before you have models you can always just do `await knex('table_name').del`
//   await knex('user').del();

//   await knex.raw('ALTER SEQUENCE user_id_seq RESTART WITH 1');

//   await User.create('cool_cat', '1234');
//   await User.create('l33t-guy', '1234');
//   await User.create('wowow', '1234');
// };

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(() => {
      // Inserts seed entries
      return knex('user').insert([
        {username: 'john_doe', password_hash: 'hashed_password_1'},
        {username: 'jane_doe', password_hash: 'hashed_password_2'}
      ]);
    });
};
