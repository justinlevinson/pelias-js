/**
 * The main constructor class for the Pelias client
 */

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
 }

 const _isAlive = () => {
   return('true')
 }