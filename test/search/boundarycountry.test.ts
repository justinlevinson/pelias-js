import Pelias from "../../src/lib";

describe('Boundary Country', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryCountry("")}).toThrow()
  })
})