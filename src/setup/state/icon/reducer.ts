import State, {initialState} from './state'
import {ActionType, AnyAction} from './actions'

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.FETCH_ICONS_ERROR:
    return {...state, loaded: true, error: action.cause, loading: false}
  case ActionType.FETCH_ICONS_SUCCESS:
    return {...state, loaded: true, error: '', loading: false, icons: action.icons}
  case ActionType.FETCH_ICONS_REQUEST:
    return {...state, loading: true}
  default:
    return state
  }
}