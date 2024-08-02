import axios from "axios";
const baseURL = "http://129.204.166.171:5003"
const apiClient = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
      'Content-type': 'application/json'
  }
})

apiClient.interceptors.request.use(function (config) {
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

export default apiClient