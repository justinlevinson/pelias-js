/**
 * Constants
 */

// Search types
export const GET = "GET"
export const POST = "POST"

// URLs
export const SEARCH_ENDPOINT = "/v1/search?"
export const SEARCH_ENDPOINT = "/v1/autocomplete?"

// Query string params
export const QS_TEXT = "text"
export const QS_API_KEY = "api_key"
export const QS_FOCUS_LAT = "focus.point.lat"
export const QS_FOCUS_LONG = "focus.point.lon"
export const QS_RESULTS_LIMIT = "size"
export const QS_BOUNDARY_COUNTRY = "boundary.country"
export const QS_BOUNDARY_RECT_MIN_LAT = "boundary.rect.min_lat"
export const QS_BOUNDARY_RECT_MAX_LAT = "boundary.rect.max_lat"
export const QS_BOUNDARY_RECT_MIN_LON = "boundary.rect.min_lon"
export const QS_BOUNDARY_RECT_MAX_LON = "boundary.rect.max_lon"
export const QS_BOUNDARY_CIRCLE_LAT = "boundary.circle.lat"
export const QS_BOUNDARY_CIRCLE_LON = "boundary.circle.lon"
export const QS_BOUNDARY_CIRCLE_RADIUS = "boundary.circle.radius"
export const QS_BOUNDARY_ADMIN_AREA = "boundary.gid"
export const QS_DATA_SOURCES = "sources"
export const QS_LAYERS = "layers"

// Data sources
export const DATA_SOURCE_OPENSTREETMAP = "osm"
export const DATA_SOURCE_OPENADDRESSES = "oa"
export const DATA_SOURCE_WHOSONFIRST = "wof"
export const DATA_SOURCE_GEONAMES = "gn"

// Layers
export const PLACE_TYPE_ADDRESS = "address"
export const PLACE_TYPE_VENUE = "venue"
export const PLACE_TYPE_NEIGHBOURHOOD = "neighbourhood"
export const PLACE_TYPE_LOCALITY = "locality"
export const PLACE_TYPE_BOROUGH = "borough"
export const PLACE_TYPE_LOCALADMIN = "localadmin"
export const PLACE_TYPE_COUNTY = "county"
export const PLACE_TYPE_MACROCOUNTY = "macrocounty"
export const PLACE_TYPE_REGION = "region"
export const PLACE_TYPE_MACROREGION = "macroregion"
export const PLACE_TYPE_COUNTRY = "country"
export const PLACE_TYPE_COARSE = "coarse"

// Mins and maxes
export const MIN_LAT = "min_lat"
export const MAX_LAT = "max_lat"
export const MIN_LON = "min_lon"
export const MAX_LON = "max_lon"
export const LAT = "lat"
export const LON = "lon"
export const RADIUS = "radius"