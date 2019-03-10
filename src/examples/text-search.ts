import Pelias from '..'

var client = new Pelias()

client.search
  .setSearchTerm('ymca')
  .setFocusPoint("45.523064", "-122.676483")
  .execute()
  .then((response) => {
    console.log(response)
  })