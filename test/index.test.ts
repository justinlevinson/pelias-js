import Pelias from '../src/lib/index'

describe('SearchTerm', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setSearchTerm("")}).toThrow()
  })
})

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

describe('ResultsLimit', () => {
  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setResultsLimit("" as any)}).toThrow()
  })

  it('Throws on non numeric', () => {
    const client = new Pelias()
    expect(() => {client.search.setResultsLimit("ABC" as any)}).toThrow()
  })
})