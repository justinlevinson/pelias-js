/**
 * The main constructor class for the Pelias client
 */

import Search from './search/index'

class Pelias {

  search: Search

  // Subclasses handle validation of configuration
  constructor(config: any) {
    this.search = new Search(config)
  }
}

export default Pelias