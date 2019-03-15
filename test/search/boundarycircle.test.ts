import Pelias from "../../src/lib";

describe('Boundary Circle', () => {
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
})