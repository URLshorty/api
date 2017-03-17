
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.table('user_urls', function (table) {
      table.string('shortened')
      table.integer('visits')
        .defaultTo(0)
    }),

    knex.schema.table('urls', function (table) {
      table.dropColumn('shortened')
      table.dropColumn('visits')
    })

  ])
};

exports.down = function(knex, Promise) {

  knex.schema.table('user_urls', function (table) {
    table.dropColumn('shortened')
    table.dropColumn('visits')
  }),

  knex.schema.table('urls', function (table) {
    table.string('shortened')
    table.integer('visits')
      .defaultTo(0)
  })

};
