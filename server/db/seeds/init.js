/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//refacter to await

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("post").del();
  await knex("resource").del();
  await knex("comment").del();

  // Inserts seed entries
  await knex("user").insert([
    {
      first_name: "bob",
      last_name: "dylan",
      email: "bobdylan@mail.com",
      username: "john_doe",
      password_hash: "hashed_password_1",
      expert: true,
    },
    {
      first_name: "bob",
      last_name: "dylan",
      email: "bobdylan2@mail.com",
      username: "john_doe2",
      password_hash: "hashed_password_1",
      expert: false,
    },
    {
      first_name: "bob",
      last_name: "dylan",
      email: "bobdylan3@mail.com",
      username: "john_doe3",
      password_hash: "hashed_password_1",
      expert: true,
    },
  ]);

  await knex("post").insert([
    {
      title: "a title about something",
      body: "body body body kajbfjasfgsfbal",
      user_id: 1
    },
    {
      title: "a title about something",
      body: "body body body kajbfjasfgsfbal",
      user_id: 2
    },
    {
      title: "a title about something",
      body: "body body body kajbfjasfgsfbal",
      user_id: 3
    },
  ]);

    await knex("resource").insert([
      {
        user_id: 1,
        url: "https://www.uchicagomedicine.org/forefront/pediatrics-articles/2024/january/improving-asthma-outcomes-and-reducing-health-disparities"
      },
      {
        user_id: 2,
        url: "https://www.medicalnewstoday.com/articles/running-with-asthma"
      },
      {
        user_id: 3,
        url: "https://www.who.int/news-room/fact-sheets/detail/asthma"
      },
    ]);
};
