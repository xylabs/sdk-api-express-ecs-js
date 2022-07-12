import { createLogger, transports } from 'winston'

import { logFormatLocalDev, logFormatStructured } from './LogFormats'
import { Logger } from './Logger'
import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './toWinstonVerbosity'
import { WinstonVerbosity } from './WinstonVerbosity'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

const { Console } = transports

const format = process.env.NODE_ENV === 'development' ? logFormatLocalDev : logFormatStructured
const transport = new Console()
const handleRejections = true

const loggers: Record<WinstonVerbosity, Logger | undefined> = {
  debug: undefined,
  error: undefined,
  http: undefined,
  info: undefined,
  silly: undefined,
  verbose: undefined,
  warn: undefined,
}

export const getLogger = (minVerbosity: LoggerVerbosity = 'info'): Logger => {
  const level = toWinstonVerbosity(minVerbosity)
  const existing = loggers[level]
  if (existing) return existing
  const logger = new WrappedWinstonLogger(
    createLogger({
      format,
      handleRejections,
      level,
      rejectionHandlers: [transport],
      transports: [transport],
    })
  )
  loggers[level] = logger
  return logger
}
