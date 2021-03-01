// Update with your config settings.

module.exports = {
  production: {
    client: 'pg',
    connection: {
      database: 'test_db',
      user:     'postgres',
      password: 'mypassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }
};
