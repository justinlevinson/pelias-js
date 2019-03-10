/**
 * Constants
 */

// Load via dotenv for Node
require('dotenv').config()

// Base Pelias URL from config
export const BASE_URL = process.env.PELIAS_URL

// Search types
export const GET = "GET"
export const POST = "POST"

// URLs
export const SEARCH_ENDPOINT = "/v1/search?"

// Query string params
export const QS_TEXT = "text"
export const QS_FOCUS_LAT = "focus.point.lat"
export const QS_FOCUS_LONG = "focus.point.lon"
