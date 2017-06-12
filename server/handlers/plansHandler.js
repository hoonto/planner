const RelationalDbStore = require('jsonapi-store-relationaldb')

const config = require('../../config')[process.env.NODE_ENV || 'dev']

module.exports = new RelationalDbStore(config.env.database)
