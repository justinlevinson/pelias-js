# pelias-js
A JavaScript client making it easy to access the functionality on a Pelias geocoder without getting down and nerdy
with the API details. Less coding, more geocoding.

Under heavy development. Standard forward geocoding is implemented, the rest will be coming soon. 

[ circa 1993 underconstruction.gif ]

## Installation
```
    yarn install
    yarn build
```
## Example
```
   var client = new Pelias({peliasUrl: "http://YOUR_PELIAS_URL"})
   
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

## Caveats for Node
`pelias-js` works wherever you JS. It does use `fetch`, however - if you'd like to use it in a Node environment, you'll
need to polyfill it. A quick-and-dirty implementation with `node-fetch` might look like:

TypeScript: 
```
(global as any).fetch = require('node-fetch')
```

Standard JS: 
```
global.fetch = require('node-fetch')
```
