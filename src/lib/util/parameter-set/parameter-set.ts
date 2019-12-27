
/**
 * Parameters to be set for Pelias searches. Uses 'this' so each search module can import identical functions
 * and apply to the internal search object.
 */

import {
  isNumeric,
  isValidBoundaryCircle,
  isValidBoundaryRectangle,
  isValidDataSources,
  isValidLayers,
  isValidString,
  isValidGids
} from "../validate/validate";

import { IConfig, IBoundaryCircle, ICoordinate, IBoundaryRectangle } from '../../interfaces'

export const setSearchTerm = function(objectKey: string, searchTerm: string) {
  if(!isValidString(searchTerm)) {
    throw new Error('Search term should be a nonempty string')
  }
  this[objectKey].searchTerm = searchTerm
  return this
}

// Set a locale to search near - require both lat and long
export const setFocusPoint = function(objectKey: string, point: ICoordinate) {
  if(!isNumeric(point.lat) || !isNumeric(point.lon)) {
    throw new Error('Lat and long values should be numeric floating-point coordinates')
  }
  this[objectKey].focusPoint = point
  return this
}

// Set a locale to search near - require both lat and long
export const setResultsLimit = function(objectKey: string, limit: number) {
  if(!Number.isInteger(limit)) {
    throw new Error('Limit should be an integer')
  }
  this[objectKey].resultsLimit = limit
  return this
}

// Restrict search to a boundary country
export const setBoundaryCountry = function(objectKey: string, boundaryCountry: string) {
  if(!isValidString(boundaryCountry)) {
    throw new Error('Boundary country should be a nonempty string')
  }
  this[objectKey].boundaryCountry = boundaryCountry
  return this
}

// Restrict search to a boundary rectangle
export const setBoundaryRectangle = function(objectKey: string, boundaryRectangle: any) {
  if(!isValidBoundaryRectangle(boundaryRectangle)) {
    throw new Error('Boundary rectangle should be an object with keys min_lat, max_lat, min_lon, max_lon. Values should be floating-point coordinates')
  }
  this[objectKey].boundaryRectangle = boundaryRectangle
  return this
}

// Restrict search to a boundary circle
export const setBoundaryCircle = function(objectKey: string, boundaryCircle: any) {
  if(!isValidBoundaryCircle(boundaryCircle)) {
    throw new Error('Boundary circle should be an object with keys lat, lon, and radius. Lat and lon should be floating-point coordinates, radius may be floating point or integer')
  }
  this[objectKey].boundaryCircle = boundaryCircle
  return this
}

// Restrict search to a boundary admin area
export const setBoundaryAdminArea = function(objectKey: string, boundaryAdminArea: string) {
  if(!isValidString(boundaryAdminArea)) {
    throw new Error('Boundary admin area should be a nonempty string')
  }
  this[objectKey].boundaryAdminArea = boundaryAdminArea
  return this
}

// Restrict search to a specific data source
export const setDataSources = function(objectKey: string, dataSources: string[]) {
  if(!isValidDataSources(dataSources)) {
    throw new Error('Data sources should be an array with one or more of: oa, osm, wof, gn')
  }
  this[objectKey].dataSources = dataSources
  return this
}

// Restrict search to a specific layer
export const setLayers = function(objectKey: string, layers: string[]) {
  if(!isValidLayers(layers)) {
    throw new Error('Data sources should be an array with one or more of: venue, address, street, neighbourhood, borough, localadmin, locality, county, macrocounty, region, macroregion, country, coarse')
  }
  this[objectKey].layers = layers
  return this
}

// Set ids 
export const setIds = function(objectKey: string, ids: string[]) {
  if (!isValidGids(ids)) {
    throw new Error("Ids must be valid gids");
  }
  this[objectKey].ids = ids;
  return this;
};