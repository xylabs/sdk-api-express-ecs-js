import Rollbar from 'rollbar'
import Transport, { TransportStreamOptions } from 'winston-transport'

import { logFormatRollbar } from '../../LogFormats'

export class RollbarTransport extends Transport {
  constructor(opts: TransportStreamOptions, protected readonly rollbar?: Rollbar) {
    super({ ...opts, format: logFormatRollbar, level: 'error' })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(info: { message?: string }, next: () => void) {
    this.rollbar?.error(info?.message)
    this.emit('logged', info?.message)
    next()
  }
}
