
exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.raw("ALTER TABLE urls ALTER COLUMN requests SET DEFAULT 1")

  ])

};

exports.down = function(knex, Promise) {

  return Promise.all([

    knex.schema.raw("ALTER TABLE urls ALTER COLUMN requests SET DEFAULT 0")

  ])

};
