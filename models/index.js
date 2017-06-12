'use strict'
var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')

const config = require('../config')[process.env.NODE_ENV || 'dev']

var sequelize = new Sequelize(config.env.database.name, config.env.database.username, config.env.database.password, config.env.database)
console.log(`Database: ${config.env.database.database} ${config.env.database.username}@${config.env.database.host}`)
var db = {}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
