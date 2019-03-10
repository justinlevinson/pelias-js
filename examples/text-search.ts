import Pelias from '/'

const client = new Pelias()

client.search
  .setSearchTerm('ymca')
  .get()