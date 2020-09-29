export default function <T>(name: string, value: any | T): T {
  if (!value) {
    throw new Error(`${name} is null`)
  }
  return value
}