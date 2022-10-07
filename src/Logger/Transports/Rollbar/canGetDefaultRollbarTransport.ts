export const canGetDefaultRollbarTransport = (): boolean => {
  const accessToken = process.env.ROLLBAR_ACCESS_TOKEN
  return accessToken ? true : false
}
