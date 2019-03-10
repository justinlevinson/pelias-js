import Pelias from '..'

var client = new Pelias()

client.search
  .setSearchTerm('ymca')
  .execute()