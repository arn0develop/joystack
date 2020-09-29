import State, {initialState} from './state'
import {ActionType, AnyAction} from './actions'

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.FETCH_PLUGINS_SUCCESS:
  case ActionType.UPDATE_PLUGIN_LIST_SUCCESS:
  case ActionType.UPDATE_SINGLE_PLUGIN_SUCCESS:
    return {...state, fetchError: '', plugins: action.plugins}
  case ActionType.FETCH_PLUGINS_ERROR:
    return {...state, fetchError: action.cause}
  case ActionType.UPDATE_SINGLE_PLUGIN_ERROR:
  case ActionType.UPDATE_PLUGIN_LIST_ERROR:
    return {...state, updateError: action.cause}
  default:
    return state
  }
}