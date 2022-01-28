export class Counters {
  public static counters: Record<string, number> = {}

  private static catchError = (name: string, func: (name: string) => void) => {
    try {
      func(name)
    } catch (ex) {
      this.counters[name] = 0
      this.inc('CountersErrors')
    }
  }

  public static inc(name: string, count = 1) {
    this.catchError(name, (name: string) => {
      this.counters[name] = (this.counters[name] ?? 0) + count
    })
  }
  public static min(name: string, count: number) {
    this.catchError(name, (name: string) => {
      const currentValue = this.counters[name]
      if (currentValue === undefined || count < currentValue) {
        this.counters[name] = count
      }
    })
  }
  public static max(name: string, count: number) {
    this.catchError(name, (name: string) => {
      const currentValue = this.counters[name]
      if (currentValue === undefined || count > currentValue) {
        this.counters[name] = count
      }
    })
  }
}
