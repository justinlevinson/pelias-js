import Pelias from "../../src/lib";
import {place, search} from "../../src/lib/util/fetch/fetch";
jest.mock('../../src/lib/util/fetch/fetch');

describe('Ids', () => {

  beforeEach(() => {
    (place as any).mockClear()
  })

  it('Throws on a string', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.place.setIds("on" as any)}).toThrow()
  })

  it('Throws on an empty array', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.place.setIds([] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.place.setIds(['ABC'] as any)}).toThrow()
  })

  it('Throws on an array with an invalid value with valid values', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    expect(() => {client.place.setIds(['openstreetmap:venue:relation/9194723', 'ABC'] as any)}).toThrow()
  })

  it('Correctly sets one id', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})
    client.place.setIds(["openstreetmap:venue:relation/9194723"]).execute();
    expect(place).toHaveBeenCalledWith(
      "http://127.0.0.1:4000",
      "ids=openstreetmap%3Avenue%3Arelation%2F9194723"
    );
  })

  it('Correctly sets multiple ids', () => {
    const client = new Pelias({peliasUrl: "http://127.0.0.1:4000"})

    client.place
      .setIds([
        "openstreetmap:venue:relation/9194723",
        "openaddresses:address:es/12345:1234567890987654"
      ])
      .execute();
    expect(place).toHaveBeenCalledWith(
      "http://127.0.0.1:4000",
      "ids=openstreetmap%3Avenue%3Arelation%2F9194723%2Copenaddresses%3Aaddress%3Aes%2F12345%3A1234567890987654"
    );
  })
})