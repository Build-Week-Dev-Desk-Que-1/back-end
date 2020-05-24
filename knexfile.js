// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/devque.db3'
    },
    seeds: {
      directory: "./data/seed"
    },
    pool: {
      afterCreate: function(connection, done) {
        connection.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./data/devque.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migration"
    },
    seeds: {
      directory: "./data/seed"
    },
    pool: {
      afterCreate: function(connection, done) {
        connection.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migration"
    },
    seeds: {
      directory: "./data/seed"
    }
  }
};
