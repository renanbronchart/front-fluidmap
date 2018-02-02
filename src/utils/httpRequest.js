import axios from 'axios'

const baseUrl = process.env.BASE_URL_API

const HTTP = axios.create({
  baseURL: baseUrl,
  headers: {
    'Access-Control-Allow-Origin': process.env.ACCESS_CONTROL_ORIGIN
  }
})

export default HTTP
