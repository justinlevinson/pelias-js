import Pelias from '../../src/lib/index'
import {search} from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');

describe('SearchTerm', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.search.setSearchTerm("")}).toThrow()
  })

  it('Correctly sets a search term', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.search.setSearchTerm("test").execute()
    expect(search).toHaveBeenCalledWith("http://127.0.0.1:4000","text=test")
  })
})









