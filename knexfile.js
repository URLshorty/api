// Update with your config settings.

//consider pooling options
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_STRING,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_STRING,
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_STRING,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
