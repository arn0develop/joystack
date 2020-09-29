import State, {initialState} from './state'
import {ActionType, AnyAction} from './actions'

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.FETCH_TYPES_ERROR:
    return {...state, loaded: true, error: action.cause, loading: false}
  case ActionType.FETCH_TYPES_SUCCESS:
    return {...state, loaded: true, error: '', loading: false, types: action.types}
  case ActionType.FETCH_TYPES_REQUEST:
    return {...state, loading: true}
  default:
    return state
  }
}