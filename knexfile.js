require('path')
require('dotenv').config()

//consider pooling options
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_STRING,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  },

  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_STRING,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_STRING,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`
    }
  }

}
