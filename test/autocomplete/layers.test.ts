import Pelias from "../../src/lib";
import {autocomplete} from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');

describe('Layers', () => {

  beforeEach(() => {
    (autocomplete as any).mockClear()
  })

  it('Throws on an string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setLayers("on" as any)}).toThrow()
  })

  it('Throws on an empty array', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setLayers([] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setLayers(['ABC'] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value with valid values', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setLayers(['address', 'ABC'] as any)}).toThrow()
  })

  it('Correctly sets one layer', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.autocomplete.setLayers(['address']).execute()
    expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","layers=address")
  })

  it('Correctly sets multiple layers', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})

    client.autocomplete.setLayers(['address', 'borough']).execute()
    expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","layers=address%2Cborough")
  })
})