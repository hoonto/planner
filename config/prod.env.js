module.exports = {
  NODE_ENV: '"production"',
  database: {
    username: 'production_user_name',
    password: 'production_user_password',
    database: 'production_database_name',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  jsonApiConfig: {
    apidocs: '/api-docs',
    graphiql: false,
    swagger: {
      title: 'JSON API Server for Maintenance Planner',
      version: '0.0.1',
      description: 'Maintenance Planner API',
      contact: {
        name: 'Matt Mullens'
      },
      license: {
        name: 'MIT',
        url: 'http://opensource.org/licenses/MIT'
      }
    },
    protocol: 'http',
    hostname: 'localhost',
    port: 9001,
    base: 'rest',
    meta: {
      description: 'This block shows up in the root node of every payload'
    }
  }
}
