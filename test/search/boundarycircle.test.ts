import Pelias from "../../src/lib";
import { search } from '../../src/lib/util/fetch/fetch'
jest.mock('../../src/lib/util/fetch/fetch');

describe('Boundary Circle', () => {

  beforeEach(() => {
    (search as any).mockClear()
  })

  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryCircle("" as any)}).toThrow()
  })

  it('Throws on non numeric', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryCircle({lat: 0, lon: 0, radius: "ABC"} as any)}).toThrow()
  })

  it('Throws if missing a value', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryCircle({lat: 0, lon: 0} as any)}).toThrow()
  })
  it('Correctly sets a boundary circle', () => {
    const client = new Pelias()
    client.search.setBoundaryCircle({lat: 0, lon: 0, radius: 1}).execute()
    expect(search).toHaveBeenCalledWith("boundary.circle.lat=0&boundary.circle.lon=0&boundary.circle.radius=1")
  })

  it('Correctly sets an admin area and text', () => {
    const client = new Pelias()
    client.search.setBoundaryCircle({lat: 0, lon: 0, radius: 1}).setSearchTerm("test").execute()
    expect(search).toHaveBeenCalledWith("text=test&boundary.circle.lat=0&boundary.circle.lon=0&boundary.circle.radius=1")
  })
})