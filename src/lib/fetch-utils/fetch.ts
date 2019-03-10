/**
 * Fetch utilities
 */

import { BASE_URL, SEARCH_ENDPOINT } from '../constants'
import fetch from 'node-fetch'

export const search = (queryString: string) => {
  return fetchGet(`${BASE_URL}${SEARCH_ENDPOINT}`, queryString)
}

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

  const fetchUrl = queryString ? `${url}${queryString}` : url

  return fetch(fetchUrl)
    .then(checkResponse)
    .then(getJson)
}
