import Pelias from "../../src/lib";

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
})
