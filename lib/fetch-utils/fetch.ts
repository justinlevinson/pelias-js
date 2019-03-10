/**
 * Fetch utilities
 */


// Fetch helpers
const checkResponse = (response: any) => {
  return response.ok
    ? response
    : Promise.reject(new Error('Error in fetch: ' + response.status))
}

const getText = (response: any) => {
  return response.text()
}

const getJson = (response: any) => {
  return response.json()
}

const fetchGet = (url: string, queryString?: string ) => {
  return fetch(url)
    .then(checkResponse)
    .then(getJson)
}
