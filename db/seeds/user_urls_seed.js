
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_urls').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_urls').insert([
        {id: 1, user_id: 1, url_id: 1},
        {id: 2, user_id: 2, url_id: 2},
        {id: 3, user_id: 3, url_id: 3},
        {id: 4, user_id: 4, url_id: 4},
        {id: 5, user_id: 5, url_id: 5}
      ]);
    });
};
