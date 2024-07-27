import axios from 'axios'

axios.defaults.baseURL = "http://8.138.96.163:8081/quant"

const request = axios.create({
  timeout:2000,
  headers:{
    "Content-Type":"application/json"
  }
})

request.interceptors.response.use(res => {
  return res.data
}, error => {
  return Promise.reject(error)
})

export default request