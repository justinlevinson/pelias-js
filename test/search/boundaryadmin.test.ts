import Pelias from "../../src/lib";
import { search } from '../../src/lib/util/fetch/fetch'
jest.mock('../../src/lib/util/fetch/fetch');

describe('Boundary Admin Area', () => {

  beforeEach(() => {
    (search as any).mockClear()
  })

  it('Throws on an empty string', () => {
    const client = new Pelias()
    expect(() => {client.search.setBoundaryAdminArea("")}).toThrow()
  })

  it('Correctly sets an admin area', () => {
    const client = new Pelias()
    client.search.setBoundaryAdminArea("whosonfirst:region:85688585").execute()
    expect(search).toHaveBeenCalledWith("boundary.gid=whosonfirst%3Aregion%3A85688585")
  })

  it('Correctly sets an admin area and text', () => {
    const client = new Pelias()
    client.search.setBoundaryAdminArea("whosonfirst:region:85688585").setSearchTerm("test").execute()
    expect(search).toHaveBeenCalledWith("text=test&boundary.gid=whosonfirst%3Aregion%3A85688585")
  })
})

