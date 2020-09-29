export default function removeFromSet<ValueT>(elements: ValueT[], value: ValueT): ValueT[] {
  return elements.includes(value)
    ? elements.filter(entry => entry !== value)
    : elements
}