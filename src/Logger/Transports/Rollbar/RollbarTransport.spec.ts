import { mock, MockProxy } from 'jest-mock-extended'
import Rollbar from 'rollbar'

import { RollbarTransport } from './RollbarTransport'

const accessToken = process.env.ROLLBAR_ACCESS_TOKEN
const unitTestSentinelLoggingString = 'error log from unit test'

describe('RollbarTransport', () => {
  let rollbar: MockProxy<Rollbar> | Rollbar
  let sut: RollbarTransport
  beforeEach(() => {
    rollbar = accessToken ? new Rollbar({ accessToken, environment: 'development' }) : mock<Rollbar>()
    sut = new RollbarTransport({}, rollbar)
  })
  it('logs', () => {
    expect(sut).toBeObject()
    const nextMock = jest.fn()
    sut.log({ message: unitTestSentinelLoggingString }, nextMock)
    expect(nextMock).toHaveBeenCalledOnce()
  })
})
