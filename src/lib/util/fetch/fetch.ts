/**
 * Fetch utilities
 */

import {AUTOCOMPLETE_ENDPOINT, SEARCH_ENDPOINT} from '../../constants'

export const search = (baseUrl: string, queryString: string) => {
  return fetchGet(`${baseUrl}${SEARCH_ENDPOINT}`, queryString)
}

export const autocomplete = (baseUrl: string, queryString: string) => {
  return throttledFetchGet(500, `${baseUrl}${AUTOCOMPLETE_ENDPOINT}`, queryString)
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

const throttledFetchGet = (timeout: number, url: string, queryString?: string) => {
  let wait = false;                 // Initially, we're not waiting
  if (!wait) {
    if(queryString) {
      return fetchGet(url, queryString)
    }
    else {
      return fetchGet(url)
    }
    wait = true;              // Prevent future invocations
    setTimeout(function () {  // After a period of time
      wait = false;         // And allow future invocations
    }, timeout);
  }
}