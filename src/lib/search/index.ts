/**
 * A fluent interface for forward geocoding in Pelias
 */
import * as Constants from '../constants'
import { search } from '../util/fetch/fetch'
import { IConfig, IBoundaryCircle, ICoordinate, IBoundaryRectangle } from '../interfaces'

import * as parameterSet from "../util/parameter-set/parameter-set"

interface ISearchObject {
  searchTerm: string,
  apiKey: string,
  focusPoint?: ICoordinate
  resultsLimit?: string
  boundaryCountry?: string
  boundaryRectangle?: IBoundaryRectangle
  boundaryCircle?: IBoundaryCircle
  boundaryAdminArea?: string
  dataSources?: string[]
  layers?: string[]
}

// Auto-instantiate in case caller forgets 'new' so as not to pollute the global namespace

// TODO: take a formed search object so the use doesn't have to use the fluent setters

class Search {

  private _searchObject
  private _baseUrl

  constructor(config: IConfig) {
    this._searchObject = {
      searchTerm: undefined,
      apiKey: config.apiKey || undefined
    }
    if(!('peliasUrl' in config)) {
      throw new Error("peliasUrl must be specified in the constructor")
    }
    this._baseUrl = config.peliasUrl
  }

  setSearchTerm = parameterSet.setSearchTerm
  setFocusPoint = parameterSet.setFocusPoint
  setResultsLimit = parameterSet.setResultsLimit
  setBoundaryCountry = parameterSet.setBoundaryCountry
  setBoundaryRectangle = parameterSet.setBoundaryRectangle
  setBoundaryCircle = parameterSet.setBoundaryCircle
  setBoundaryAdminArea = parameterSet.setBoundaryAdminArea
  setDataSources = parameterSet.setDataSources
  setLayers = parameterSet.setLayers

  execute = () => {
    const query = buildSearchQueryString(this._searchObject)
    return search(this._baseUrl, query).then((response) => {
      return(response)
    })
  }
}

// Search takes a GET request with a variety of query string params
const buildSearchQueryString = (searchObject: ISearchObject) => {
  const paramsArray = [] as [string, string][]

  if(searchObject.searchTerm) {
    paramsArray.push([Constants.QS_TEXT, searchObject.searchTerm] )
  }

  if(searchObject.apiKey) {
    paramsArray.push([Constants.QS_API_KEY, searchObject.apiKey])
  }

  if(searchObject.focusPoint) {
    paramsArray.push([Constants.QS_FOCUS_LAT, searchObject.focusPoint.lat])
    paramsArray.push([Constants.QS_FOCUS_LONG, searchObject.focusPoint.lon])
  }

  if(searchObject.resultsLimit) {
    paramsArray.push([Constants.QS_RESULTS_LIMIT, searchObject.resultsLimit])
  }

  if(searchObject.boundaryCountry) {
    paramsArray.push([Constants.QS_BOUNDARY_COUNTRY, searchObject.boundaryCountry])
  }

  if(searchObject.boundaryRectangle) {
    paramsArray.push([Constants.QS_BOUNDARY_RECT_MIN_LAT, searchObject.boundaryRectangle.min_lat])
    paramsArray.push([Constants.QS_BOUNDARY_RECT_MAX_LAT, searchObject.boundaryRectangle.max_lat])
    paramsArray.push([Constants.QS_BOUNDARY_RECT_MIN_LON, searchObject.boundaryRectangle.min_lon])
    paramsArray.push([Constants.QS_BOUNDARY_RECT_MAX_LON, searchObject.boundaryRectangle.max_lon])
  }

  if(searchObject.boundaryCircle) {
    paramsArray.push([Constants.QS_BOUNDARY_CIRCLE_LAT, searchObject.boundaryCircle.lat])
    paramsArray.push([Constants.QS_BOUNDARY_CIRCLE_LON, searchObject.boundaryCircle.lon])
    paramsArray.push([Constants.QS_BOUNDARY_CIRCLE_RADIUS, searchObject.boundaryCircle.radius])
  }

  if(searchObject.boundaryAdminArea) {
    paramsArray.push([Constants.QS_BOUNDARY_ADMIN_AREA, searchObject.boundaryAdminArea])
  }

  if(searchObject.dataSources) {
    paramsArray.push([Constants.QS_DATA_SOURCES, searchObject.dataSources.join(",")])
  }

  if(searchObject.layers) {
    paramsArray.push([Constants.QS_LAYERS, searchObject.layers.join(",")])
  }

  const searchParams = paramsArray.map((keyValPair: string[]) => {
    return `${encodeURIComponent(keyValPair[0])}=${encodeURIComponent(keyValPair[1])}`
  }).join('&')

  return searchParams

}

export default Search
