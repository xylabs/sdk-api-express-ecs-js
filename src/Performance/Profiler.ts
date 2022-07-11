export class Profiler {
  public stats: Record<string, number> = {}

  public async profile<T>(name: string, promise: Promise<T>) {
    const start = Date.now()
    const result = await promise
    this.stats[name] = Date.now() - start
    return result
  }
}
