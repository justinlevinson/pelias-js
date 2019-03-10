/**
 * A fluent interface for forward geocoding in Pelias
 */
import { QS_TEXT } from '../constants'
import { URLSearchParams } from "url";
import { search } from '../fetch-utils/fetch'

interface ISearchObject {
  searchTerm: string
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

  execute = () => {
    const query = buildSearchQueryString(this._searchObject)
    search(query).then((response) => {
      console.log(response)
    })
  }
}

// Search takes a GET request with a variety of query string params
const buildSearchQueryString = (searchObject: ISearchObject) => {
  const paramsArray = []

  if(searchObject.searchTerm) {
    paramsArray.push([QS_TEXT, searchObject.searchTerm])
  }

  const searchParams = new URLSearchParams(paramsArray)
    return searchParams.toString()
}

export default Search
