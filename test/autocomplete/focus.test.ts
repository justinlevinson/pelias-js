import Pelias from "../../src/lib";
import { autocomplete } from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');

describe('SetFocus', () => {

  beforeEach(() => {
    (autocomplete as any).mockClear()
  })

  it('Throws on an empty string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setFocusPoint("" as any)}).toThrow()
  })

  it('Throws if missing lon', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setFocusPoint({lat: 12.3456} as any)}).toThrow()
  })

  it('Throws if missing lat', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setFocusPoint({lon: 12.3456} as any)}).toThrow()
  })

  it('Throws if not a number', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.autocomplete.setFocusPoint({lat: "abc", lon: 12.3456} as any)}).toThrow()
  })

  it('Correctly sets a focus point when passed floating point values', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.autocomplete.setFocusPoint({lat: 12.3456, lon: 78.9012} as any).execute()
    expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","focus.point.lat=12.3456&focus.point.lon=78.9012")
  })

  it('Correctly sets a focus point when passed string values', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.autocomplete.setFocusPoint({lat: "01.2345", lon: "67.8901"} as any).execute()
    expect(autocomplete).toHaveBeenCalledWith("http://127.0.0.1:4000","focus.point.lat=01.2345&focus.point.lon=67.8901")
  })
})