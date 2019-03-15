import Pelias from "../../src/lib";

describe('SetFocus', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setFocusPoint("" as any)}).toThrow()
  })

  it('Throws if missing lon', () => {
    const client = new Pelias()
    expect(() => {client.search.setFocusPoint({lat: 12.3456} as any)}).toThrow()
  })

  it('Throws if missing lat', () => {
    const client = new Pelias()
    expect(() => {client.search.setFocusPoint({lon: 12.3456} as any)}).toThrow()
  })

  it('Throws if not a number', () => {
    const client = new Pelias()
    expect(() => {client.search.setFocusPoint({lat: "abc", lon: 12.3456} as any)}).toThrow()
  })
})