import { mock, MockProxy } from 'jest-mock-extended'
import Rollbar from 'rollbar'

import { WinstonRollbarTransport } from './WinstonRollbarTransport'

const accessToken = process.env.ROLLBAR_ACCESS_TOKEN
const unitTestSentinelLoggingString = 'foo'

describe('WinstonRollbarTransport', () => {
  let rollbar: MockProxy<Rollbar> | Rollbar
  let sut: WinstonRollbarTransport
  beforeEach(() => {
    rollbar = accessToken ? new Rollbar({ accessToken, environment: 'development' }) : mock<Rollbar>()
    sut = new WinstonRollbarTransport({}, rollbar)
  })
  it('logs', () => {
    expect(sut).toBeObject()
    const nextMock = jest.fn()
    sut.log(unitTestSentinelLoggingString, nextMock)
    expect(nextMock).toHaveBeenCalledOnce()
  })
})
