
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id').primary()
      table.string('username')
      table.string('email')
      table.string('password_digest')
      table.boolean('is_admin')
        .defaultTo(0)
      table.foreign('most_visited_url_id')
        .references('id')
        .inTable('urls')
      table.timestamps()
    }),

    knex.schema.createTableIfNotExists('urls', function(table){
      table.increments('id').primary()
      table.string('original')
      table.string('shortened')
      table.integer('requests')
        .defaultTo(0)
      table.integer('visits')
        .defaultTo(0)
      table.timestamps()
    }),

    knex.schema.createTableIfNotExists('user_urls', function(table){
      table.increments('id').primary()
      table.foreign('user_id')
        .references('id')
        .inTable('users')
      table.foreign('url_id')
       .references('id')
       .inTable('urls')
      table.timestamps()
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('user_urls'),
      knex.schema.dropTable('urls')
  ])
};
