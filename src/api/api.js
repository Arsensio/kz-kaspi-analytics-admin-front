import axios from 'axios'
import { clearStoredToken, getStoredToken } from '../context/authStorage.js'

const runtimeConfig = window.__APP_CONFIG__ || {}

function attachInterceptors(client) {
  client.interceptors.request.use((config) => {
    const token = getStoredToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        clearStoredToken()

        if (window.location.pathname !== '/login') {
          window.location.assign('/login')
        }
      }

      return Promise.reject(error)
    },
  )

  return client
}

function createApiClient(baseURL, headers = {}) {
  return attachInterceptors(
    axios.create({
      baseURL,
      headers,
    }),
  )
}

const api = createApiClient(
  runtimeConfig.VITE_API_URL || import.meta.env.VITE_API_URL || '',
  {
    'Content-Type': 'application/json',
  },
)

export const parserApi = createApiClient(
  runtimeConfig.VITE_PARSER_API_URL || import.meta.env.VITE_PARSER_API_URL || '',
)

export default api
