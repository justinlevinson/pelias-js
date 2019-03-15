import Pelias from "../../src/lib";

describe('Layers', () => {
  it('Throws on an string', () => {
    const client = new Pelias()
    expect(() => {client.search.setLayers("on" as any)}).toThrow()
  })

  it('Throws on an empty array', () => {
    const client = new Pelias()
    expect(() => {client.search.setLayers([] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value', () => {
    const client = new Pelias()
    expect(() => {client.search.setLayers(['ABC'] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value with valid values', () => {
    const client = new Pelias()
    expect(() => {client.search.setLayers(['address', 'ABC'] as any)}).toThrow()
  })
})