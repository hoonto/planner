const jsonApi = require('jsonapi-server')
const plansHandler = require('../handlers/plansHandler')

jsonApi.define({
  resource: 'plans',
  description: 'Maintenance Plans',
  handlers: plansHandler,
  searchParams: {},
  attributes: {
    title: jsonApi.Joi.string().required(),
    duedate: jsonApi.Joi.string().required()
  },
  examples: [
    {
      title: 'Lawn Maintenance',
      duedate: '2018-01-05 00:00:00.000'
    }
  ]
})
