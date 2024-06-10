const SESSION_SCALE = 'SESSION_SCALE'
const SESSION_LONGITUDE = 'SESSION_LONGITUDE'
const SESSION_lATITUDE = 'SESSION_LATITUDE'

export function setScale (scale) {
  window.sessionStorage.setItem(SESSION_SCALE, JSON.stringify(scale))
}

export function setLongitude (lon) {
  window.sessionStorage.setItem(SESSION_LONGITUDE, lon)
}

export function setLatitude (lat) {
  window.sessionStorage.setItem(SESSION_lATITUDE, lat)
}
export function getScale () {
  return JSON.parse(window.sessionStorage.getItem(SESSION_SCALE))
}

export function getLongitude () {
  return window.sessionStorage.getItem(SESSION_LONGITUDE)
}

export function getLatitude () {
  return window.sessionStorage.getItem(SESSION_lATITUDE)
}