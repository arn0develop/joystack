import {initialState, State} from './state'
import {ActionType, AnyAction} from './actions'

export function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.SET_LANGUAGE:
    return {...state, language: action.language}
  default:
    return state
  }
}
