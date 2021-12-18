export const compactObject = <T extends Record<string, unknown>>(obj: T) => {
  const result: Record<string, unknown> = {}
  Object.keys(obj).forEach((key: string) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      result[key] = obj[key]
    }
  })
  return result as T
}
