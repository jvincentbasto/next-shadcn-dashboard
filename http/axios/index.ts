import axios, { AxiosInstance, CancelTokenSource } from 'axios'

//
let cancelTokenSource: CancelTokenSource | null = null
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Request interceptor
api.interceptors.request.use(
  config => {
    //
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Operation canceled due to new request.')
    }

    //
    cancelTokenSource = axios.CancelToken.source()
    config.cancelToken = cancelTokenSource.token

    //
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  response => {
    //
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
