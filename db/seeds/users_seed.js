
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Sarah', email: 'sarah@gmail.com', most_visited_url_id: 1, is_admin: 0},
        {id: 2, username: 'Eddy', email: 'eddy@gmail.com', most_visited_url_id: 2, is_admin: 0},
        {id: 3, username: 'Rohan', email: 'rohan@gmail.com', most_visited_url_id: 3, is_admin: 1},
        {id: 4, username: 'Edith', email: 'edith@gmail.com', most_visited_url_id: 4, is_admin: 0},
        {id: 5, username: 'Pat', email: 'pat@gmail.com', most_visited_url_id: 5, is_admin: 1},
      ]);
    });
};
