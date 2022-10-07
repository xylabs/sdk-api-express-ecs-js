import Rollbar from 'rollbar'

import { RollbarTransport } from './RollbarTransport'

export const getDefaultRollbarTransport = (): RollbarTransport => {
  const accessToken = process.env.ROLLBAR_ACCESS_TOKEN
  const rollbar: Rollbar = new Rollbar({ accessToken })
  return new RollbarTransport({}, rollbar)
}
