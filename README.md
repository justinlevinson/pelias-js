# pelias-js
A JavaScript client making it easy to access the functionality on a Pelias geocoder without getting down and nerdy
with the API details. Less coding, more geocoding.

Under heavy development. Standard forward geocoding and autocomplete are implemented, the rest will be coming soon. 

[ circa 1993 underconstruction.gif ]

## Installation
There is an NPM package with the same name, `pelias-js`, so you can just:

```
  yarn add pelias-js
```

and then in your JS file
```
  import Pelias from 'pelias-js';
```

or, if you prefer to build from source:
```
  yarn install
  yarn build
```

## Setup
`pelias-js` expects a configuration object at time of instantiation, with the format:
```
  {
    peliasUrl: string,
    apiKey: string /* optional */
  }
```

where peliasUrl is a string containing the URL, with protocol and port, to your Pelias instance. If you are using a hosted Pelias-compatible service such as [geocode.earth](https://geocode.earth/) you will also need to provide an API key.

## Example Usage
```
   var client = new Pelias({peliasUrl: "http://YOUR_PELIAS_URL:4000"})
   
   client.search
     .setSearchTerm('ymca')
     .setFocusPoint({lat: "45.523064", lon: "-122.676483"})
     .execute()
     .then((response) => {
       console.log(response)
     })
     .catch((error) => {
        console.log(error)
     })
```

Full examples are in the `examples` directory.

## Caveats for Node
`pelias-js` works wherever you write JS. It does use `fetch`, however - if you'd like to use it in a Node environment, you'll
need to polyfill it. A quick-and-dirty implementation with `node-fetch` might look like:

TypeScript: 
```
(global as any).fetch = require('node-fetch')
```

Standard JS: 
```
global.fetch = require('node-fetch')
```

## API: Search - forward geocoder
`pelias-js` implements all functionality that Pelias provides. The section below will provide examples and a short description
of each field, for full details please visit the official Pelias docs at: https://github.com/pelias/documentation/blob/master/search.md

Search implements a fluent interface, so chaining query terms is perfectly acceptable. The geocoder will perform the search
when the `.execute()` function is invoked, e.g.
```
client.search
  .setSearchTerm('ymca')
  .setDataSources(['OA', 'OSM']
  .execute()
```

Each `set` function performs some basic validation on its input prior to actually sending the request to Pelias and will throw an Error if it fails.

`execute()` returns a Promise that will resolve to the Pelias response. Non-200 responses will throw an Error.

### Search Term (required)
The string to search for. 
```
client.search
  .setSearchTerm('ymca')
```


### Boundary administration area
Restricts search results to a particular area. Takes a Who's On First `gid` as a string, found using the Spelunker: http://spelunker.whosonfirst.org/
```
client.search
  setBoundaryAdminArea("whosonfirst:region:85688585")
```

### Boundary circle
Accepts an object with a `lat`, `lon`, and `radius`. This will restrict search results to a circle with `radius` kilometers drawn around the specified coordinate.
```
client.search
  setBoundaryCircle({lat: "45.523064", lon: "-122.676483", radius: 10})
```

### Boundary country
Accepts a string with the alpha-2 or alpha-3 ISO-3166 country code.
```
client.search
  setBoundaryCountry("GBR")
```

### Boundary rectangle
Accepts an object with a `max_lat`, `max_lon`, `min_lat`, and `min_long` and restricts search results to the area formed by this rectangle.
```
client.search
  setBoundaryCircle({lat: "45.523064", lon: "-122.676483", radius: 10})
```

### Data sources
Filters search results by data source. Accepts an array of strings containing one or more of (case insensitive):
- `osm` (OpenStreetMap)
- `oa` (OpenAddresses)
- `wof` (Who's On First)
- `gn` (GeoNames)

```
client.search
  setDataSources(['OA', 'OSM'])
```

### Focus point
Sets a coordinate to use as a base location. Search results will be sorted, in part, by proximity to this point. 
Accepts an object of form {`lat`: string, `lon`: string} with floating-point values.

```
client.search
  setFocusPoint({lat: "01.2345", lon: "67.8901"}
```

### Layers
Filters search results by place type, derived from Who's On First. Accepts an array of strings containing one or more of (case insensitive):
- `venue` 	points of interest, businesses, things with walls
- `address` 	places with a street address
- `street` 	streets,roads,highways
- `neighbourhood` 	social communities, neighbourhoods
- `borough` 	a local administrative boundary, currently only used for New York City
- `localadmin` 	local administrative boundaries
- `locality` 	towns, hamlets, cities
- `county` 	official governmental area; usually bigger than a locality, almost always smaller than a region
- `macrocounty` 	a related group of counties. Mostly in Europe.
- `region` 	states and provinces
- `macroregion` 	a related group of regions. Mostly in Europe
- `country` 	places that issue passports, nations, nation-states
- `coarse` 	alias for simultaneously using all administrative layers (everything except venue and address)

```
client.search
  .setLayers(['address', 'borough'])
```

### Results limit
Limits number of results returned. Defaults to 10. Accepts an integer.

```
client.search
  .setResultsLimit(10)
```

## API: Autocomplete - autocomplete search
Autocomplete works nearly identically to `search`. As it is meant to be used in UI elements, 
requests are throttled to one per 500ms. Not all search fields are included, however, only:
- term
- focus point
- boundary country
- boundary rectangle
- data sources
- layers

Official Pelias docs are at: https://github.com/pelias/documentation/blob/master/autocomplete.md

```
client.autocomplete
  .setLayers(['address', 'borough'])
  .setSearchTerm('ymca')
  .setFocusPoint({lat: "45.523064", lon: "-122.676483"})
  .execute()
```

## License
GPLv3


