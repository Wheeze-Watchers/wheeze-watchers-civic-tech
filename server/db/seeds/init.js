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
      title: "Getting sick or asthma exacerbation?",
      body: `I have had 3 horrible bouts of illness in 6 months and I’m wondering if it’s actually just asthma and allergy exacerbation. It starts with a dry cough that turns to a wet one with yellow mucus and then when my chest clears it goes into my nose before I feel better. No fevers and my doctor won’t even test for me anything anymore. She’s really not interested in helping me.`,
      user_id: 1
    },
    {
      title: "I don’t know if I have asthma please advise",
      body: `Hi everyone, I’m 26m and for the last 2-3 weeks I’ve been having some strange symptoms I’ve never had before. Let me first say that I currently cannot afford health insurance or a doctor’s visit (though I’ve been tempted to say screw it and go to the ER and take the hit to my credit).`,
      user_id: 2
    },
    {
      title: "Excess mucus/saliva when running",
      body: `Anyone got any tips on how to avoid this / deal with symptoms? Don’t have problems catching my breath but the shear amount of times I need to spit are driving me crazy. If I don’t it feels like I’ve got something in my throat/ choking on my own fluids.`,
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
        url: "https://news.weill.cornell.edu/news/2013/05/researchers-find-common-childhood-asthma-unconnected-to-allergens-or-inflammation"
      },
      // {
      //   user_id: 3,
      //   url: "https://www.who.int/news-room/fact-sheets/detail/asthma"
      // },
    ]);
};
