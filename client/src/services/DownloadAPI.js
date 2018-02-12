import axios from 'axios'

export default () => {
  const baseURL = 'http://localhost:3600'
  return axios.create({ baseURL })
}