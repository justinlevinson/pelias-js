/**
 * A fluent interface for autocomplete searches in Pelias
 */
import * as Constants from '../constants'
import { autocomplete } from '../util/fetch/fetch'
import { IConfig, ICoordinate, IBoundaryRectangle } from '../interfaces'

import * as parameterSet from "../util/parameter-set/parameter-set"

interface IAutocompleteObject {
  searchTerm: string,
  apiKey: string,
  focusPoint?: ICoordinate
  boundaryCountry?: string
  boundaryRectangle?: IBoundaryRectangle
  dataSources?: string[]
  layers?: string[]
}

// TODO: take a formed search object so the use doesn't have to use the fluent setters

class Autocomplete {

  private _autocompleteObject
  private _baseUrl

  constructor(config: IConfig) {
    this._autocompleteObject = {
      searchTerm: undefined,
      apiKey: config.apiKey || undefined
    }
    if(!('peliasUrl' in config)) {
      throw new Error("peliasUrl must be specified in the constructor")
    }
    this._baseUrl = config.peliasUrl
  }

  setSearchTerm = parameterSet.setSearchTerm.bind(this, '_autocompleteObject')
  setFocusPoint = parameterSet.setFocusPoint.bind(this, '_autocompleteObject')
  setBoundaryCountry = parameterSet.setBoundaryCountry.bind(this, '_autocompleteObject')
  setBoundaryRectangle = parameterSet.setBoundaryRectangle.bind(this, '_autocompleteObject')
  setDataSources = parameterSet.setDataSources.bind(this, '_autocompleteObject')
  setLayers = parameterSet.setLayers.bind(this, '_autocompleteObject')

  execute = () => {
    const query = buildAutocompleteQueryString(this._autocompleteObject)
    return autocomplete(this._baseUrl, query).then((response) => {
      return(response)
    })
  }
}

// Search takes a GET request with a variety of query string params
const buildAutocompleteQueryString = (autocompleteObject: IAutocompleteObject) => {
  const paramsArray = [] as [string, string][]

  if(autocompleteObject.searchTerm) {
    paramsArray.push([Constants.QS_TEXT, autocompleteObject.searchTerm] )
  }

  if(autocompleteObject.apiKey) {
    paramsArray.push([Constants.QS_API_KEY, autocompleteObject.apiKey])
  }

  if(autocompleteObject.focusPoint) {
    paramsArray.push([Constants.QS_FOCUS_LAT, autocompleteObject.focusPoint.lat])
    paramsArray.push([Constants.QS_FOCUS_LONG, autocompleteObject.focusPoint.lon])
  }

  if(autocompleteObject.boundaryCountry) {
    paramsArray.push([Constants.QS_BOUNDARY_COUNTRY, autocompleteObject.boundaryCountry])
  }

  if(autocompleteObject.boundaryRectangle) {
    paramsArray.push([Constants.QS_BOUNDARY_RECT_MIN_LAT, autocompleteObject.boundaryRectangle.min_lat])
    paramsArray.push([Constants.QS_BOUNDARY_RECT_MAX_LAT, autocompleteObject.boundaryRectangle.max_lat])
    paramsArray.push([Constants.QS_BOUNDARY_RECT_MIN_LON, autocompleteObject.boundaryRectangle.min_lon])
    paramsArray.push([Constants.QS_BOUNDARY_RECT_MAX_LON, autocompleteObject.boundaryRectangle.max_lon])
  }

  if(autocompleteObject.dataSources) {
    paramsArray.push([Constants.QS_DATA_SOURCES, autocompleteObject.dataSources.join(",")])
  }

  if(autocompleteObject.layers) {
    paramsArray.push([Constants.QS_LAYERS, autocompleteObject.layers.join(",")])
  }

  const autocompleteParams = paramsArray.map((keyValPair: string[]) => {
    return `${encodeURIComponent(keyValPair[0])}=${encodeURIComponent(keyValPair[1])}`
  }).join('&')

  return autocompleteParams

}

export default Autocomplete
