import { LoggerMeta } from './LoggerMeta'
import { LoggerVerbosity } from './LoggerVerbosity'

export interface LoggerOptions {
  defaultMeta?: LoggerMeta
  level?: LoggerVerbosity
}
