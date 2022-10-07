import Rollbar from 'rollbar'
import Transport, { TransportStreamOptions } from 'winston-transport'

export class RollbarTransport extends Transport {
  constructor(opts: TransportStreamOptions, protected readonly rollbar?: Rollbar) {
    super(opts)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(info: any, next: () => void) {
    this.rollbar?.error(info)
    this.emit('logged', info)
    next()
  }
}
