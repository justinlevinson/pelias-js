/**
 * The main constructor class for the Pelias client
 */

import Search from './search/index'
import Autocomplete from './autocomplete/index'
import Place from './place/index'

class Pelias {

  search: Search
  autocomplete: Autocomplete
  place: Place

  // Subclasses handle validation of configuration
  constructor(config: any) {
    this.search = new Search(config)
    this.autocomplete = new Autocomplete(config)
    this.place = new Place(config)
  }
}

export default Pelias