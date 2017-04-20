
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropColumn('most_visited_url_id')
    })
  ])

};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('users', function (table) {
      table.integer('most_visited_url_id')
    })
  ])

};
