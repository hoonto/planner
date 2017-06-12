import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:9001/rest',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

