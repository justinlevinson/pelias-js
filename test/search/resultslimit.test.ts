import Pelias from "../../src/lib";

describe('Results Limit', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setResultsLimit("" as any)}).toThrow()
  })

  it('Throws on non numeric', () => {
    const client = new Pelias()
    expect(() => {client.search.setResultsLimit("ABC" as any)}).toThrow()
  })
})
