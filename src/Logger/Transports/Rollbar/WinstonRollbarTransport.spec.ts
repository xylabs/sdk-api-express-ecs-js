import { mock, MockProxy } from 'jest-mock-extended'
import Rollbar from 'rollbar'

import { WinstonRollbarTransport } from './WinstonRollbarTransport'

describe('WinstonRollbarTransport', () => {
  let rollbar: MockProxy<Rollbar>
  let sut: WinstonRollbarTransport
  beforeEach(() => {
    rollbar = mock<Rollbar>()
    sut = new WinstonRollbarTransport({}, rollbar)
  })
  it('logs', () => {
    expect(sut).toBeObject()
    const nextMock = jest.fn()
    sut.log('foo', nextMock)
    expect(nextMock).toHaveBeenCalledOnce()
  })
})
