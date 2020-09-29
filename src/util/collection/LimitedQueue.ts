interface IterationResult<ElementT> {
  value: ElementT | null
  done: boolean
}

class Iteration<ElementT> {
  private index: number;

  constructor(
    private readonly entries: ElementT[],
    private readonly length: number
  ) {
    this.index = 0
  }

  next(): IterationResult<ElementT>{
    if (this.index >= this.length) {
      return { done: true, value: null }
    }
    return {
      done: false,
      value: this.entries[this.index++]
    }
  }
}

export default class LimitedQueue<ElementT> {
  static of<ElementT>(...elements: ElementT[]): LimitedQueue<ElementT> {
    return new LimitedQueue<ElementT>(
      elements,
      0
    )
  }

  private full: boolean;

  private constructor(
    private readonly entries: ElementT[],
    private insertionIndex: number
  ) {
    this.full = false
  }

  insert(entry: ElementT) {
    const index = this.selectInsertionIndex()
    this.entries[index] = entry
  }

  private selectInsertionIndex(): number {
    if (this.insertionIndex >= this.entries.length) {
      this.insertionIndex = 0
      this.full = true
    }
    return this.insertionIndex++
  }

  [Symbol.iterator]() {
    const endIndex = this.full ? this.entries.length : this.insertionIndex
    return new Iteration<ElementT>(this.entries, endIndex)
  }

  toArray(): ElementT[] {
    if (this.full) {
      return [...this.entries]
    }
    return this.entries.slice(0, this.insertionIndex)
  }
}