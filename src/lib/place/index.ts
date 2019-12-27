/**
 * A fluent interface for forward geocoding in Pelias
 */
import * as Constants from '../constants'
import { place } from '../util/fetch/fetch'
import { IConfig } from '../interfaces'

import * as parameterSet from "../util/parameter-set/parameter-set"

interface IPlaceObject {
  ids: string[],
  apiKey: string
}

class Place {

  private _placeObject
  private _baseUrl

  constructor(config: IConfig) {
    this._placeObject = {
      ids: undefined,
      apiKey: config.apiKey || undefined
    }
    if(!('peliasUrl' in config)) {
      throw new Error("peliasUrl must be specified in the constructor")
    }
    this._baseUrl = config.peliasUrl
  }

  setIds = parameterSet.setIds.bind(this, '_placeObject')

  execute = () => {
    const query = buildPlaceQueryString(this._placeObject)
    return place(this._baseUrl, query).then((response) => {
      return(response)
    })
  }
}

const buildPlaceQueryString = (placeObject: IPlaceObject) => {
  const paramsArray = [] as [string, string][];

  if (placeObject.ids) {
    paramsArray.push([Constants.QS_IDS, placeObject.ids.join(',')]);
  }

  const placeParams = paramsArray
    .map((keyValPair: string[]) => {
      return `${encodeURIComponent(keyValPair[0])}=${encodeURIComponent(
        keyValPair[1]
      )}`;
    })
    .join("&");

  return placeParams;
};

export default Place;
