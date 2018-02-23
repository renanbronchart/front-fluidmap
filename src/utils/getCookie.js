const getCookie = function getCookie (name) {
  const prefix = name + '='
  let dc = document.cookie
  let begin = dc.indexOf('; ' + prefix)

  if (begin === -1) {
    begin = dc.indexOf(prefix)
    if (begin !== 0) return null
  } else {
    begin += 2
    var end = document.cookie.indexOf(';', begin)

    if (end === -1) {
      end = dc.length
    }
  }

  return decodeURI(dc.substring(begin + prefix.length, end))
}

const setCookie = function setCookie (name, value, days) {
  var cookie = name + '=' + value + ';'

  if (days !== undefined) {
    var date = new Date()

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    cookie += ' expires=' + date.toUTCString() + ';'
  }

  cookie += ' path=/;'
  document.cookie = cookie
}

export default {
  getCookie,
  setCookie
}
