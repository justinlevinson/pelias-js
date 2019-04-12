import Pelias from "../../src/lib";
import {autocomplete} from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');

describe('Data Sources', () => {

  beforeEach(() => {
    (autocomplete as any).mockClear()
  })

  it('Throws on an string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setDataSources("on" as any)}).toThrow()
  })

  it('Throws on an empty array', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setDataSources([] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setDataSources(['ABC'] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value with valid values', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setDataSources(['OA', 'ABC'] as any)}).toThrow()
  })

  it('Correctly sets one data source', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.autocomplete.setDataSources(['OA']).execute()
    expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","sources=OA")
  })

  it('Correctly sets multiple data sources', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.autocomplete.setDataSources(['OA', 'OSM']).execute()
    expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","sources=OA%2COSM")
  })
})