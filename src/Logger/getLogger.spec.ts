/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockDeep } from 'jest-mock-extended'
global.console = mockDeep<Console>()

import { Logger } from 'winston'

import { getLogger } from './getLogger'

type LoggerKey = keyof Logger
const loggerKeys: LoggerKey[] = ['error', 'warn', 'log', 'info', 'debug']

describe('getLogger', () => {
  describe('verbosity', () => {
    it.each(loggerKeys)('logs log with %s verbosity', (verbosity: LoggerKey) => {
      const logger = getLogger({}, 'all')
      const logMethod = (logger as any)[verbosity]
      expect(logMethod).toBeFunction()
      logMethod(`${new String(verbosity)} log from unit test`)
    })
  })
})
