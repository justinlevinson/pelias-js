import Pelias from '../../src/index'
(global as any).fetch = require('node-fetch')

var client = new Pelias({peliasUrl: "127.0.0.1:4000"})

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