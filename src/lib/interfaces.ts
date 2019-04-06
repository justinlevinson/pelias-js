/**
 * Interfaces for Pelias functionality
 */
export interface IBoundaryRectangle {
  min_lat: string
  max_lat: string
  min_lon: string
  max_lon: string
}

export interface IBoundaryCircle {
  lat: string
  lon: string
  radius: string
}

export interface ICoordinate {
  lat: string
  lon: string
}


export interface IConfig {
  peliasUrl: string,
  apiKey?: string
}