export default function(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (character) => {
      const entry = (Math.random() * 16) | 0
      const target = character === 'x' ? entry : (entry & 0x3) | 0x8
      return target.toString(16)
    }
  )
}