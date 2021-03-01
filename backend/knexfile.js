// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'siscoffee_db',
      user:     'postgres',
      password: '@$PAjats252817'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }

  },
  production: {
    client: 'pg',
    connection: {
      database: 'siscoffee_db',
      user:     'postgres',
      password: '@$PAjats252817'
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
