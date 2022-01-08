export class Counters {
  public static counters: Record<string, number> = {}
  public static inc(name: string, count = 1) {
    try {
      this.counters[name] = (this.counters[name] ?? 0) + count
    } catch (ex) {
      this.counters[name] = 0
      this.inc('CountersErrors')
    }
  }
  public static min(name: string, count: number) {
    try {
      const currentValue = this.counters[name]
      if (currentValue === undefined || count < currentValue) {
        this.counters[name] = count
      }
    } catch (ex) {
      this.counters[name] = 0
      this.inc('CountersErrors')
    }
  }
  public static max(name: string, count: number) {
    try {
      const currentValue = this.counters[name]
      if (currentValue === undefined || count > currentValue) {
        this.counters[name] = count
      }
    } catch (ex) {
      this.counters[name] = 0
      this.inc('CountersErrors')
    }
  }
}
