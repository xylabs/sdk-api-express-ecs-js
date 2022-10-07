import { LoggerMeta } from './LoggerMeta'
import { LoggerVerbosity } from './LoggerVerbosity'

export interface LoggerOptions {
  level?: LoggerVerbosity
  defaultMeta?: LoggerMeta
}
