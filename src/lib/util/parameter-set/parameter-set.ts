
/**
 * Parameters to be set for Pelias searches. Uses 'this' so each search module can import identical functions
 * and apply to the internal search object.
 */

import {
  isNumeric,
  isValidBoundaryCircle,
  isValidBoundaryRectangle,
  isValidDataSources, isValidLayers,
  isValidString
} from "../validate/validate";

import { IConfig, IBoundaryCircle, ICoordinate, IBoundaryRectangle } from '../../interfaces'

export const setSearchTerm = function(searchTerm: string) {
  if(!isValidString(searchTerm)) {
    throw new Error('Search term should be a nonempty string')
  }
  this._searchObject.searchTerm = searchTerm
  return this
}

// Set a locale to search near - require both lat and long
export const setFocusPoint = function(point: ICoordinate) {
  if(!isNumeric(point.lat) || !isNumeric(point.lon)) {
    throw new Error('Lat and long values should be numeric floating-point coordinates')
  }
  this._searchObject.focusPoint = point
  return this
}

// Set a locale to search near - require both lat and long
export const setResultsLimit = function(limit: number) {
  if(!Number.isInteger(limit)) {
    throw new Error('Limit should be an integer')
  }
  this._searchObject.resultsLimit = limit
  return this
}

// Restrict search to a boundary country
export const setBoundaryCountry = function(boundaryCountry: string) {
  if(!isValidString(boundaryCountry)) {
    throw new Error('Boundary country should be a nonempty string')
  }
  this._searchObject.boundaryCountry = boundaryCountry
  return this
}

// Restrict search to a boundary rectangle
export const setBoundaryRectangle = function(boundaryRectangle: any) {
  if(!isValidBoundaryRectangle(boundaryRectangle)) {
    throw new Error('Boundary rectangle should be an object with keys min_lat, max_lat, min_lon, max_lon. Values should be floating-point coordinates')
  }
  this._searchObject.boundaryRectangle = boundaryRectangle
  return this
}

// Restrict search to a boundary circle
export const setBoundaryCircle = function(boundaryCircle: any) {
  if(!isValidBoundaryCircle(boundaryCircle)) {
    throw new Error('Boundary circle should be an object with keys lat, lon, and radius. Lat and lon should be floating-point coordinates, radius may be floating point or integer')
  }
  this._searchObject.boundaryCircle = boundaryCircle
  return this
}

// Restrict search to a boundary admin area
export const setBoundaryAdminArea = function(boundaryAdminArea: string) {
  if(!isValidString(boundaryAdminArea)) {
    throw new Error('Boundary admin area should be a nonempty string')
  }
  this._searchObject.boundaryAdminArea = boundaryAdminArea
  return this
}

// Restrict search to a specific data source
export const setDataSources = function(dataSources: string[]) {
  if(!isValidDataSources(dataSources)) {
    throw new Error('Data sources should be an array with one or more of: oa, osm, wof, gn')
  }
  this._searchObject.dataSources = dataSources
  return this
}

// Restrict search to a specific layer
export const setLayers = function(layers: string[]) {
  if(!isValidLayers(layers)) {
    throw new Error('Data sources should be an array with one or more of: venue, address, street, neighbourhood, borough, localadmin, locality, county, macrocounty, region, macroregion, country, coarse')
  }
  this._searchObject.layers = layers
  return this
}