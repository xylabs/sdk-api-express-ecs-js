import { mock, MockProxy } from 'jest-mock-extended'
import Rollbar from 'rollbar'

import { WinstonRollbarTransport } from './WinstonRollbarTransport'

describe('WinstonRollbarTransport', () => {
  const rollbar: MockProxy<Rollbar> = mock<Rollbar>()
  const logger = new WinstonRollbarTransport({}, rollbar)
  it('logs', () => {
    expect(logger).toBeObject()
    const nextMock = jest.fn()
    logger.log('foo', nextMock)
    expect(nextMock).toHaveBeenCalledOnce()
  })
})
