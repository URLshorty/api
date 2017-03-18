
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('urls', function (table) {
      table.integer('visits')
        .defaultTo(0)
    })
  ])

};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('urls', function (table) {
      table.dropColumn('visits')
    })
  ])

};
