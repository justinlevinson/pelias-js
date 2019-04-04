// The 'text' param for Pelias
import {isValidString} from "../validate/validate";

export const setSearchTerm = function(searchTerm: string) {
  if(!isValidString(searchTerm)) {
    throw new Error('Search term should be a nonempty string')
  }
  this._searchObject.searchTerm = searchTerm
  return this
}