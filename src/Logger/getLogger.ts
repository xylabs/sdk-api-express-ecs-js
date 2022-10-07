import { createLogger, transports as winstonTransports } from 'winston'
import TransportStream from 'winston-transport'

import { logFormatLocalDev, logFormatStructured } from './LogFormats'
import { Logger } from './Logger'
import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './toWinstonVerbosity'
import { WinstonVerbosity } from './WinstonVerbosity'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

const handleRejections = true
const exitOnError = false

const { Console } = winstonTransports
const format = process.env.NODE_ENV === 'development' ? logFormatLocalDev : logFormatStructured
const consoleTransport = new Console()
const transports: TransportStream[] = [consoleTransport]

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
      exitOnError,
      format,
      handleRejections,
      level,
      rejectionHandlers: transports,
      transports,
    }),
  )
  loggers[level] = logger
  return logger
}
