import Pelias from '../lib/index'
import { isTSAnyKeyword } from '@babel/types';

describe('Class constructor', () => {
  it('Builds properties correctly', () => {
    const client = new Pelias()
    expect(client.isAlive()).toBe('true')
  })
})