const AUTH_TOKEN_KEY = 'token'
const AUTH_CHANGE_EVENT = 'auth:changed'

function notifyAuthChanged(token) {
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: { token } }))
}

export function getStoredToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setStoredToken(token) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
  notifyAuthChanged(token)
}

export function clearStoredToken() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  notifyAuthChanged(null)
}

export function subscribeToAuthChanges(callback) {
  const handleAuthChanged = (event) => {
    callback(event.detail?.token ?? null)
  }

  const handleStorage = (event) => {
    if (event.key === AUTH_TOKEN_KEY) {
      callback(event.newValue)
    }
  }

  window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChanged)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChanged)
    window.removeEventListener('storage', handleStorage)
  }
}
