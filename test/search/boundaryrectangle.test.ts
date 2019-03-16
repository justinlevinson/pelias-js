import Pelias from "../../src/lib";
import {search} from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');


describe('Boundary Rectangle', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryRectangle("" as any)}).toThrow()
  })

  it('Throws on non numeric', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryRectangle({min_lat: 0, max_lat: 0, min_lon: 0, max_lon: "ABC"} as any)}).toThrow()
  })

  it('Throws if missing a value', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryRectangle({min_lat: 0, max_lat: 0, min_lon: 0} as any)}).toThrow()
  })

  it('Correctly sets a boundary rectangle', () => {
    const client = new Pelias()
    client.search.setBoundaryRectangle({min_lat: 0, max_lat: 0, min_lon: 1, max_lon: 1}).execute()
    expect(search).toHaveBeenCalledWith("boundary.rect.min_lat=0&boundary.rect.max_lat=0&boundary.rect.min_lon=1&boundary.rect.max_lon=1")
  })
})
