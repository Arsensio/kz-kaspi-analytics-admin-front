import api from './api.js'

export async function loginRequest(credentials) {
  const response = await api.post('/auth/admin/login', credentials)
  return response.data
}
