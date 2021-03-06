import Pelias from "../../src/lib";
import {search} from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');

describe('Results Limit', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.search.setResultsLimit("" as any)}).toThrow()
  })

  it('Throws on non numeric', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.search.setResultsLimit("ABC" as any)}).toThrow()
  })

  it('Correctly sets a results limit', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.search.setResultsLimit(5).execute()
    expect(search).toHaveBeenCalledWith("http://127.0.0.1:4000","size=5")
  })
})
