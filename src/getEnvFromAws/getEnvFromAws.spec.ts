import { SdkError } from '@aws-sdk/types'

import { getEnvFromAws } from './getEnvFromAws'
test('all', async () => {
  expect.assertions(1)
  try {
    return await getEnvFromAws('does-not-exist')
  } catch (ex) {
    const error = ex as SdkError
    console.log(`error: ${JSON.stringify(error, null, 2)}`)
    expect(error.name).toEqual('ResourceNotFoundException')
  }
})
