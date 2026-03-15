import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import { AuthContext } from './authContext.js'
import {
  clearStoredToken,
  getStoredToken,
  setStoredToken,
  subscribeToAuthChanges,
} from './authStorage.js'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken())

  useEffect(() => subscribeToAuthChanges(setToken), [])

  function login(nextToken) {
    setStoredToken(nextToken)
  }

  function logout() {
    clearStoredToken()
  }

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
