import { getDefaultRollbarTransport } from '../getDefaultRollbarTransport'

describe('getDefaultRollbarTransport', () => {
  it('returns the transport', () => {
    const env = { ROLLBAR_ACCESS_TOKEN: 'something' }
    const transport = getDefaultRollbarTransport(env)
    expect(transport).toBeObject()
    expect(transport.log).toBeFunction()
  })
})
