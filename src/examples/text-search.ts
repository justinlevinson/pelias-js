import Pelias from '..'
console.log(Pelias)

var client = new Pelias()

client.search
  .setSearchTerm('ymca')
  .execute()