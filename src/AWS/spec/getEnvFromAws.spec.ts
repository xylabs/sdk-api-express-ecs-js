import { getEnvFromAws } from '../getEnvFromAws'

const nonExistentSecret = 'does-not-exist'
const errorMessage = "Secrets Manager can't find the specified secret."

describe('getEnvFromAws', () => {
  test('gets the ENV from AWS', async () => {
    await expect(async () => await getEnvFromAws(nonExistentSecret)).rejects.toThrow(errorMessage)
  })
})
