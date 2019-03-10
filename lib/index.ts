/**
 * The main constructor class for the Pelias client
 */

import Search from './lib/search/'

// Auto-instantiate in case caller forgets 'new' so as not to pollute the global namespace
export default function Pelias() {
 if(!(this instanceof Pelias)) {
   return new Pelias()
 }

 Object.defineProperty(Pelias.prototype,
  'isAlive', {
    get: () => {
      return(_isAlive)
    }
 })

Object.defineProperty(Pelias.prototype,
  'search', {
    get: () => {
      return(_search())
    }
  })
}

 const _isAlive = () => {
   return('true')
 }

 const _search = () => {
   return new Search()
 }