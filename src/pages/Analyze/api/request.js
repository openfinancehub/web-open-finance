import axios from 'axios'

export  const requestone = axios.create({
  baseURL:"http://8.138.96.163:8081/quant",
  timeout:2000,
  headers:{
    "Content-Type":"application/json"
  }
})

requestone.interceptors.response.use(res => {
  return res.data
}, error => {
  return Promise.reject(error)
})

export const requesttwo = axios.create({
  baseURL:"http://129.204.166.171:5003/api/v1",
  headers:{
    'Content-type': 'application/json'
  }
})
requesttwo.interceptors.request.use(function (config) {
  
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  if (username && password) {
      config.auth = {
          username,
          password
      }
  }

  return config
})
