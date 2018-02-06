import axios from 'axios'

export default () => {
  const baseURL = process.env.DOWNLOAD_SERVICE_URL
  return axios.create({ baseURL })
}