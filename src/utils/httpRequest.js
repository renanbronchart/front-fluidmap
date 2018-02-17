import axios from 'axios'

const baseUrl = process.env.API_URL

const HTTP = axios.create({
  baseURL: baseUrl
})

export default HTTP
