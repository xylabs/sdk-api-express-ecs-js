import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './toWinstonVerbosity'

const loggerKeys: LoggerVerbosity[] = ['error', 'warn', 'info', 'debug', 'all']

describe('toWinstonVerbosity', () => {
  it.each(loggerKeys)('provides a default logger', (verbosity) => {
    const actual = toWinstonVerbosity(verbosity)
    expect(actual).toBeString()
  })
})
