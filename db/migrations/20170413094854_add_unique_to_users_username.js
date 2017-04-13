
exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.alterTable('users', function(table) {
      table.unique('username')
    })

  ])

};

exports.down = function(knex, Promise) {

  return Promise.all([

    knex.schema.alterTable('users', function(table) {
      table.dropUnique('username')
    })

  ])

};
