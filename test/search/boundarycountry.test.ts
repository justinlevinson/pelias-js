import Pelias from "../../src/lib";
import { search } from '../../src/lib/util/fetch/fetch'
jest.mock('../../src/lib/util/fetch/fetch');


describe('Boundary Country', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryCountry("")}).toThrow()
  })
})

it('Correctly sets a boundary country', () => {
  const client = new Pelias()
  client.search.setBoundaryCountry("test").execute()
  expect(search).toHaveBeenCalledWith("boundary.country=test")
})