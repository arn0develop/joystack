export default function (input: TemplateStringsArray): string {
  return input.join('').split('\n').join('')
}
