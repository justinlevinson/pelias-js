import Pelias from '../../src/lib/index'
import {search} from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');

describe('SearchTerm', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setSearchTerm("")}).toThrow()
  })

  it('Correctly sets a search term', () => {
    const client = new Pelias()
    client.search.setSearchTerm("test").execute()
    expect(search).toHaveBeenCalledWith("text=test")
  })
})









