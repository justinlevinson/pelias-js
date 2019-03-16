/**
 * A fluent interface for forward geocoding in Pelias
 */
import * as Constants from '../constants'
import { URLSearchParams } from "url";
import { search } from '../util/fetch/fetch'
import {
  isValidString,
  isNumeric,
  isValidBoundaryRectangle,
  isValidBoundaryCircle,
  isValidDataSources,
  isValidLayers
} from "../util/validate/validate";

interface ISearchObject {
  searchTerm: string
  focusPoint?: ICoordinate
  resultsLimit?: string
  boundaryCountry?: string
  boundaryRectangle?: IBoundaryRectangle
  boundaryCircle?: IBoundaryCircle
  boundaryAdminArea?: string
  dataSources?: string[]
  layers?: string[]
}

interface IBoundaryRectangle {
  min_lat: string
  max_lat: string
  min_lon: string
  max_lon: string
}

interface IBoundaryCircle {
  lat: string
  lon: string
  radius: string
}

interface ICoordinate {
  lat: string
  lon: string
}

interface IConfig {
  peliasUrl: string
}

// Auto-instantiate in case caller forgets 'new' so as not to pollute the global namespace

// TODO: take a formed search object so the use doesn't have to use the fluent setters

class Search {

  private _searchObject
  private _baseUrl

  constructor(config: IConfig) {
    this._searchObject = {
      searchTerm: undefined
    }
    if(!('peliasUrl' in config)) {
      throw new Error("peliasUrl must be specified in the constructor")
    }
    this._baseUrl = config.peliasUrl
  }

  // The 'text' param for Pelias
  setSearchTerm = (searchTerm: string) => {
    if(!isValidString(searchTerm)) {
      throw new Error('Search term should be a nonempty string')
    }
    this._searchObject.searchTerm = searchTerm
    return this
  }

  // Set a locale to search near - require both lat and long
  setFocusPoint = (point: ICoordinate) => {
    if(!isNumeric(point.lat) || !isNumeric(point.lon)) {
      throw new Error('Lat and long values should be numeric floating-point coordinates')
    }
    this._searchObject.focusPoint = point
    return this
  }

  // Set a locale to search near - require both lat and long
  setResultsLimit = (limit: number) => {
    if(!Number.isInteger(limit)) {
      throw new Error('Limit should be an integer')
    }
    this._searchObject.resultsLimit = limit
    return this
  }

  // Restrict search to a boundary country
  setBoundaryCountry = (boundaryCountry: string) => {
    if(!isValidString(boundaryCountry)) {
      throw new Error('Boundary country should be a nonempty string')
    }
    this._searchObject.boundaryCountry = boundaryCountry
    return this
  }

  // Restrict search to a boundary rectangle
  setBoundaryRectangle = (boundaryRectangle: any) => {
    if(!isValidBoundaryRectangle(boundaryRectangle)) {
      throw new Error('Boundary rectangle should be an object with keys min_lat, max_lat, min_lon, max_lon. Values should be floating-point coordinates')
    }
    this._searchObject.boundaryRectangle = boundaryRectangle
    return this
  }

  // Restrict search to a boundary circle
  setBoundaryCircle = (boundaryCircle: any) => {
    if(!isValidBoundaryCircle(boundaryCircle)) {
      throw new Error('Boundary circle should be an object with keys lat, lon, and radius. Lat and lon should be floating-point coordinates, radius may be floating point or integer')
    }
    this._searchObject.boundaryCircle = boundaryCircle
    return this
  }

  // Restrict search to a boundary admin area
  setBoundaryAdminArea = (boundaryAdminArea: string) => {
    if(!isValidString(boundaryAdminArea)) {
      throw new Error('Boundary admin area should be a nonempty string')
    }
    this._searchObject.boundaryAdminArea = boundaryAdminArea
    return this
  }

  // Restrict search to a specific data source
  setDataSources = (dataSources: string[]) => {
    if(!isValidDataSources(dataSources)) {
      throw new Error('Data sources should be an array with one or more of: oa, osm, wof, gn')
    }
    this._searchObject.dataSources = dataSources
    return this
  }

  // Restrict search to a specific layer
  setLayers = (layers: string[]) => {
    if(!isValidLayers(layers)) {
      throw new Error('Data sources should be an array with one or more of: venue, address, street, neighbourhood, borough, localadmin, locality, county, macrocounty, region, macroregion, country, coarse')
    }
    this._searchObject.layers = layers
    return this
  }

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

  const searchParams = new URLSearchParams(paramsArray)
    return searchParams.toString()
}

export default Search
