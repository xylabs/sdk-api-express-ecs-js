import { assertEx } from '@xylabs/assert'
import Rollbar from 'rollbar'

import { RollbarTransport } from './RollbarTransport'

export const getDefaultRollbarTransport = (): RollbarTransport => {
  const accessToken = assertEx(process.env.ROLLBAR_ACCESS_TOKEN, 'Missing ROLLBAR_ACCESS_TOKEN ENV VAR')
  const rollbar: Rollbar = new Rollbar({ accessToken })
  return new RollbarTransport({}, rollbar)
}
