/**
 * A fluent interface for forward geocoding in Pelias
 */
import { QS_TEXT, QS_FOCUS_LAT, QS_FOCUS_LONG } from '../constants'
import { URLSearchParams } from "url";
import { search } from '../fetch-utils/fetch'

interface ISearchObject {
  searchTerm: string
  focusPointLat: string
  focusPointLong: string
}

// Auto-instantiate in case caller forgets 'new' so as not to pollute the global namespace

// TODO: take a formed search object so the use doesn't have to use the fluent setters

class Search {

  private _searchObject

  constructor() {
    this._searchObject = {
      searchTerm: undefined
    }
  }

  // The 'text' param for Pelias
  setSearchTerm = (searchTerm: string) => {
    this._searchObject.searchTerm = searchTerm
    return this
  }

  // Set a locale to search near - require both lat and long
  setFocusPoint = (lat: string, long: string) => {
    this._searchObject.focusPointLat = lat
    this._searchObject.focusPointLong = long
    return this
  }

  execute = () => {
    const query = buildSearchQueryString(this._searchObject)
    return search(query).then((response) => {
      return(response)
    })
  }
}

// Search takes a GET request with a variety of query string params
const buildSearchQueryString = (searchObject: ISearchObject) => {
  const paramsArray = []

  if(searchObject.searchTerm) {
    paramsArray.push([QS_TEXT, searchObject.searchTerm])
  }

  if(searchObject.focusPointLat && searchObject.focusPointLong) {
    paramsArray.push([QS_FOCUS_LAT, searchObject.focusPointLat])
    paramsArray.push([QS_FOCUS_LONG, searchObject.focusPointLong])
  }

  const searchParams = new URLSearchParams(paramsArray)
    return searchParams.toString()
}

export default Search
