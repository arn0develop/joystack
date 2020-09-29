export default function addToSet<ValueT>(elements: ValueT[], value: ValueT): ValueT[] {
  return elements.includes(value)
    ? elements
    : elements.concat(value)
}