
exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.table('urls', function (table) {
      table.renameColumn('original', 'address')
    })

  ])

};

exports.down = function(knex, Promise) {

  return Promise.all([

    knex.schema.table('urls', function (table) {
      table.renameColumn('address', 'original')
    })

  ])

};
