'use strict'

var config = require('.')

// we have to flatten the config by one level for sequelize
module.exports = {
  development: config.dev.database,
  testing: config.dev.database,
  production: config.build.database
}
