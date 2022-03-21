import { getEnvFromAws } from './getEnvFromAws'
test('all', async () => {
  expect.assertions(1)
  try {
    return await getEnvFromAws('does-not-exist')
  } catch (ex) {
    const error = ex as Error
    console.log(`error: ${ex}`)
    expect(error.name).toEqual('ResourceNotFoundException')
  }
})
