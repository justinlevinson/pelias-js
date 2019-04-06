/**
 * Fetch utilities
 */

import { SEARCH_ENDPOINT } from '../../constants'

export const search = (baseUrl: string, queryString: string) => {
  return fetchGet(`${baseUrl}${SEARCH_ENDPOINT}`, queryString)
}

export const autocomplete = (baseUrl: string, queryString: string) => {
  return fetchGet(`${baseUrl}${SEARCH_ENDPOINT}`, queryString)
}

// Fetch helpers
const checkResponse = (response: any) => {
  return response.ok
    ? response
    : Promise.reject(new Error('Error in fetch: ' + response.status))
}

const getJson = (response: any) => {
  return response.json()
}

const fetchGet = (url: string, queryString?: string ) => {

  const fetchUrl = queryString ? `${url}${queryString}` : url

  return fetch(fetchUrl)
    .then(checkResponse)
    .then(getJson)
    .catch((error) => {
      throw new Error(`Error fetching data: ${error}`)
    })
}
