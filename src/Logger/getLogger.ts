import { createLogger, transports } from 'winston'

import { logFormatLocalDev, logFormatStructured } from './LogFormats'
import { Logger } from './Logger'
import { LoggerMeta } from './LoggerMeta'
import { LoggerVerbosity } from './LoggerVerbosity'
import { toWinstonVerbosity } from './toWinstonVerbosity'
import { WrappedWinstonLogger } from './WrappedWinstonLogger'

const { Console } = transports

const format = process.env.NODE_ENV === 'development' ? logFormatLocalDev : logFormatStructured
const transport = new Console()
const handleRejections = true

// TODO: Make dynamic and pass in for re-use

export const getLogger = (defaultMeta: LoggerMeta = {}, minimumVerbosity: LoggerVerbosity = 'info'): Logger => {
  const level = toWinstonVerbosity(minimumVerbosity)
  const logger = createLogger({
    defaultMeta,
    format,
    handleRejections,
    level,
    rejectionHandlers: [transport],
    transports: [transport],
  })
  return new WrappedWinstonLogger(logger)
}
