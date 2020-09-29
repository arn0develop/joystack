export default function orThrow<T>(value: T | undefined, error: () => any): T {
  if (value) {
    return value
  }
  throw error()
}
