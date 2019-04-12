/**
 * Fetch utilities
 */

import {AUTOCOMPLETE_ENDPOINT, SEARCH_ENDPOINT} from '../../constants'

export const search = (baseUrl: string, queryString: string) => {
  return fetchGet(`${baseUrl}${SEARCH_ENDPOINT}`, queryString)
}

export const autocomplete = (baseUrl: string, queryString: string) => {
  return throttle(fetchGet(`${baseUrl}${AUTOCOMPLETE_ENDPOINT}`, queryString), 500)
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

const throttle = (callback: any, timeout: number) => {
  let wait = false;                 // Initially, we're not waiting
  return function () {              // We return a throttled function
    if (!wait) {                  // If we're not waiting
      callback.call();          // Execute users function
      wait = true;              // Prevent future invocations
      setTimeout(function () {  // After a period of time
        wait = false;         // And allow future invocations
      }, timeout);
    }
  }
}