import Pelias from "../../src/lib";
import { search } from '../../src/lib/util/fetch/fetch'
jest.mock('../../src/lib/util/fetch/fetch');


describe('Boundary Country', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.search.setBoundaryCountry("")}).toThrow()
  })
})

it('Correctly sets a boundary country', () => {
  const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
  client.search.setBoundaryCountry("test").execute()
  expect(search).toHaveBeenCalledWith("http://127.0.0.1:4000","boundary.country=test")
})