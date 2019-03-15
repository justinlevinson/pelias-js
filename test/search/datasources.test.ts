import Pelias from "../../src/lib";

describe('Data Sources', () => {
  it('Throws on an string', () => {
    const client = new Pelias()
    expect(() => {client.search.setDataSources("on" as any)}).toThrow()
  })

  it('Throws on an empty array', () => {
    const client = new Pelias()
    expect(() => {client.search.setDataSources([] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value', () => {
    const client = new Pelias()
    expect(() => {client.search.setDataSources(['ABC'] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value with valid values', () => {
    const client = new Pelias()
    expect(() => {client.search.setDataSources(['ON, ABC'] as any)}).toThrow()
  })

})