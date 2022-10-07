import { canGetDefaultRollbarTransport } from './canGetDefaultRollbarTransport'

describe('canGetDefaultRollbarTransport', () => {
  it('returns if the default transport can be obtained', () => {
    expect(canGetDefaultRollbarTransport()).toBeBoolean()
  })
})
