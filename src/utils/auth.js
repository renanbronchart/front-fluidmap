import Router from 'vue-router'

const ID_TOKEN_KEY = 'id_token'

let router = new Router({
  mode: 'history'
})

export function logout () {
  clearIdToken()
  router.go('/')
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    next({
      name: 'Hello',
      params: {message: `You can't access this page`}
    })
  } else {
    next()
  }
}

export function sendBeforeRoute (to, from, next) {
  to.params.previousView = from.name

  next()
}

export function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

// Get and store id_token in local storage
export function setIdToken (token) {
  localStorage.setItem(ID_TOKEN_KEY, token)
}

export function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (token) {
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
