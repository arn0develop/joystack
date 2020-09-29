import State, {Entry, initialState} from './state'
import {ActionType, AnyAction} from './actions'

function updateIndex<T>(elements: T[], index: number, target: T): T[] {
  const copied = [...elements]
  copied[index] = target
  return copied
}

function updateEntry(entries: Entry[], target: Entry): Entry[] {
  const index = entries.findIndex(entry => entry.realmId === target.realmId)
  return index >= 0
    ? updateIndex(entries, index, target)
    : entries.concat(target)
}

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.FETCH_DISPLAY_SUCCESS:
    return {...state, entries: updateEntry(state.entries, action)}
  case ActionType.FETCH_DISPLAY_ERROR:
    return {...state,  error: action.cause}
  default:
    return state
  }
}