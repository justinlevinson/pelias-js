import Pelias from "../../src/lib";

describe('Boundary Admin Area', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryAdminArea("")}).toThrow()
  })
})
