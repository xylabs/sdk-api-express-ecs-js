export type ParseFunc<T = number> = (value: string) => T

export const tryParse = <T = number>(func: ParseFunc<T>, value?: string) => {
  try {
    const result = value ? func(value) : null
    if (!Number.isNaN(result) && result !== null) {
      return result
    }
  } catch {
    return undefined
  }
  return undefined
}

export const tryParseFloat = (value?: string) => {
  return tryParse(parseFloat, value)
}

export const tryParseInt = (value?: string) => {
  return tryParse(parseInt, value)
}
