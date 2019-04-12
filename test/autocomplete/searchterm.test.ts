import Pelias from '../../src/lib/index'
import {autocomplete} from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');

describe('SearchTerm', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setSearchTerm("")}).toThrow()
  })

  it('Correctly sets a search term', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.autocomplete.setSearchTerm("test").execute()
    expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","text=test")
  })

  it('Correctly sets a search term with an API key', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000", apiKey: "secretapikey"})
    client.autocomplete.setSearchTerm("test").execute()
    expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","text=test&api_key=secretapikey")
  })
})









