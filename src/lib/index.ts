/**
 * The main constructor class for the Pelias client
 */

import Search from './search/index'

class Pelias {

  search: Search

  constructor() {
    this.search = new Search()
  }
}

export default Pelias