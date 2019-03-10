/**
 * A fluent interface for forward geocoding in Pelias
 */
import { QS_TEXT } from '/lib/constants'
import { URLSearchParams } from "url";

interface ISearchObject {
  searchTerm: string
}

// Auto-instantiate in case caller forgets 'new' so as not to pollute the global namespace

// TODO: take a formed search object so the use doesn't have to use the fluent setters

export default function Search() {
  if(!(this instanceof Search)) {
    return new Search()
  }

  const _searchObject:ISearchObject = {
    searchTerm: null
  }

  // The 'text' param for Pelias
  Search.prototype.setSearchTerm = (searchTerm: string) => {
    _searchObject.searchTerm = searchTerm
    return this
  }

  Search.prototype.execute = () => {
    const query = buildSearchQueryString(_searchObject)
    console.log(query)
  }
}

// Search takes a GET request with a variety of query string params
const buildSearchQueryString = (searchObject: ISearchObject) => {
  const paramsArray = []

  if(searchObject.searchTerm) {
    paramsArray.push([QS_TEXT, searchObject.searchTerm])
  }

  return URLSearchParams(paramsArray)
}
