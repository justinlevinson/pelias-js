/**
 * Fetch utilities
 */

import * as Constants from '../../constants'

export const isValidString = (string: string) => {

  return (
    string &&
    string.length > 0
  )
}

// stolen from Angular: https://github.com/angular/angular/blob/4.3.x/packages/common/src/pipes/number_pipe.ts#L172
export const isNumeric = (value: any) => {
  return(
    value !== null &&
    typeof value !== 'undefined' &&
    !isNaN(value - parseFloat(value))
  )
}

// TODO: Allow variation in key capitalization, e.g. Lat, LAT
export const isValidBoundaryRectangle = (value: any) => {
  if (!(value instanceof Object)) {
    return false
  }
  if (!(
    Constants.MIN_LAT in value &&
    Constants.MAX_LAT in value &&
    Constants.MIN_LON in value &&
    Constants.MAX_LON in value
  )) {
    return false
  }
  if (!(
    isNumeric(value[Constants.MIN_LAT]) &&
    isNumeric(value[Constants.MAX_LAT]) &&
    isNumeric(value[Constants.MIN_LON]) &&
    isNumeric(value[Constants.MAX_LON])
  )) {
    return false
  }

  return true
}

export const isValidBoundaryCircle = (value: any) => {
  if (!(value instanceof Object)) {
    return false
  }
  if (!(
    Constants.LAT in value &&
    Constants.LON in value &&
    Constants.RADIUS in value
  )) {
    return false
  }
  if (!(
    isNumeric(value[Constants.LAT]) &&
    isNumeric(value[Constants.LON]) &&
    isNumeric(value[Constants.RADIUS])
  )) {
    return false
  }

  return true
}

export const isValidDataSources = (value: any) => {

  const validDataSources = [
    Constants.DATA_SOURCE_GEONAMES,
    Constants.DATA_SOURCE_OPENADDRESSES,
    Constants.DATA_SOURCE_OPENSTREETMAP,
    Constants.DATA_SOURCE_WHOSONFIRST
  ]
  if (!Array.isArray(value)) return false
  if (value.length === 0) return false

  // Use Array.reduce to validate each element in the array - don't silently ignore
  // invalid values

  // It's expected that these may come in various cases, so convert to lower if the value is a string
  return value.reduce((isValidArray, dataSource: string) => {
    return isValidArray && typeof dataSource === 'string' && validDataSources.includes(dataSource.toLowerCase())
  }, true)

}

export const isValidLayers = (value: any) => {

  const validLayers = [
    Constants.PLACE_TYPE_ADDRESS,
    Constants.PLACE_TYPE_BOROUGH,
    Constants.PLACE_TYPE_COARSE,
    Constants.PLACE_TYPE_COUNTRY,
    Constants.PLACE_TYPE_COUNTY,
    Constants.PLACE_TYPE_LOCALADMIN,
    Constants.PLACE_TYPE_LOCALITY,
    Constants.PLACE_TYPE_MACROCOUNTY,
    Constants.PLACE_TYPE_MACROREGION,
    Constants.PLACE_TYPE_NEIGHBOURHOOD,
    Constants.PLACE_TYPE_REGION,
    Constants.PLACE_TYPE_VENUE,
  ]
  if (!Array.isArray(value)) return false
  if (value.length === 0) return false

  // Use Array.reduce to validate each element in the array - don't silently ignore
  // invalid values

  // It's expected that these may come in various cases, so convert to lower if the value is a string
  return value.reduce((isValidArray, layer: string) => {
    return isValidArray && typeof layer === 'string' && validLayers.includes(layer.toLowerCase())
  }, true)

}