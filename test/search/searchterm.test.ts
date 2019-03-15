import Pelias from '../../src/lib/index'

describe('SearchTerm', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setSearchTerm("")}).toThrow()
  })
})









