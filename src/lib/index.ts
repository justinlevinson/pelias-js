/**
 * The main constructor class for the Pelias client
 */

import Search from './search/index'
import Autocomplete from './autocomplete/index'

class Pelias {

  search: Search
  autocomplete: Autocomplete

  // Subclasses handle validation of configuration
  constructor(config: any) {
    this.search = new Search(config)
    this.autocomplete = new Autocomplete(config)
  }
}

export default Pelias