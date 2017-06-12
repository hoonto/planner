import Service from './Service'

export default {
  get,
  post,
  del
}

function get () {
  return Service.get('plans').then(response => response.data)
}

function post (plan) {
  return Service.post('plans', {data: { attributes: plan }})
}

function del (id) {
  return Service.delete(`plans/${id}`)
}
