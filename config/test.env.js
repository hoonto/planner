var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  }
})
