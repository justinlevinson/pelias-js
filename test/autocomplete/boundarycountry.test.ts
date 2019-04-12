import Pelias from "../../src/lib";
import { autocomplete } from '../../src/lib/util/fetch/fetch'
jest.mock('../../src/lib/util/fetch/fetch');


describe('Boundary Country', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setBoundaryCountry("")}).toThrow()
  })
})

it('Correctly sets a boundary country', () => {
  const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
  client.autocomplete.setBoundaryCountry("test").execute()
  expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","boundary.country=test")
})