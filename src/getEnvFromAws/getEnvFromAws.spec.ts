// eslint-disable-next-line import/no-deprecated
import { SdkError } from '@aws-sdk/types'

import { getEnvFromAws } from './getEnvFromAws'
test('all', async () => {
  expect.assertions(1)
  try {
    return await getEnvFromAws('does-not-exist')
  } catch (ex) {
    // eslint-disable-next-line import/no-deprecated, deprecation/deprecation
    const error = ex as SdkError
    expect(error.name).toEqual('ResourceNotFoundException')
  }
})
