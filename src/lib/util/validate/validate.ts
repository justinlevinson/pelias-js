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
    value &&
    !isNaN(value - parseFloat(value))
  )
}

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