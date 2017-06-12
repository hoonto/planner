var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  database: {
    dialect: 'sqlite',
    storage: 'planner.sqlite'
  },
  jsonApiConfig: {
    graphiql: false,
    swagger: {
      apidocs: '/api-docs',
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
})
