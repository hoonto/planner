const server = module.exports = {}

const jsonApi = require('jsonapi-server')
const fs = require('fs')
const path = require('path')
const debug = require('debug')
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = require('./swagger/plans.json')
const config = require('../config')[process.env.NODE_ENV || 'dev']

jsonApi.setConfig(config.env.jsonApiConfig)

fs.readdirSync(path.join(__dirname, '/resources')).filter(filename => /^[a-z].*\.js$/.test(filename)).map(filename => path.join(__dirname, '/resources/', filename)).forEach(require)

jsonApi.onUncaughtException((request, error) => {
  const errorDetails = error.stack.split('\n')
  console.error(JSON.stringify({
    request,
    error: errorDetails.shift(),
    stack: errorDetails
  }))
})

jsonApi.metrics.on('data', data => {
  debug('metrics')(data)
})

// If we're using the example server for the test suite,
// wait for the tests to call .start();
var app = jsonApi.getExpressServer()

app.use(config.env.jsonApiConfig.apidocs, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

if (typeof describe === 'undefined') {
  console.log('API server listening @ http://%s%s%s', config.env.jsonApiConfig.hostname, ':', config.env.jsonApiConfig.port)
  console.log('Swagger API docs can be found @ http://%s%s%s%s', config.env.jsonApiConfig.hostname, ':', config.env.jsonApiConfig.port, config.env.jsonApiConfig.apidocs)
  jsonApi.start()
}
server.start = jsonApi.start
server.close = jsonApi.close
server.getExpressServer = jsonApi.getExpressServer
