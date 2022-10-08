import { createLogger, transports as winstonTransports } from 'winston'
import TransportStream from 'winston-transport'

import { logFormatLocalDev, logFormatStructured } from './LogFormats'
import { Logger } from './Logger'
import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './toWinstonVerbosity'
import { canGetDefaultRollbarTransport, getDefaultRollbarTransport } from './Transports'
import { WinstonVerbosity } from './WinstonVerbosity'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

const exitOnError = false
const handleRejections = true

const { Console } = winstonTransports
const consoleTransport = new Console()
const format = process.env.NODE_ENV === 'development' ? logFormatLocalDev : logFormatStructured
const transports: TransportStream[] = [consoleTransport]
if (canGetDefaultRollbarTransport(process.env)) {
  try {
    const rollbarTransport = getDefaultRollbarTransport(process.env)
    transports.push(rollbarTransport)
  } catch (_err) {
    // NOTE: No error here, just gracefully adding logger if ENV VARs
    // were preset
  }
}

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
