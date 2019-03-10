import Pelias from '../lib'

var client = new Pelias()

client.search
  .setSearchTerm('ymca')
  .execute()