import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.POPDYNIO_API_URL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }
})

export default axiosInstance
