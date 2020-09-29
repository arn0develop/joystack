import State, {initialState} from 'src/dashboard/state/settings/state'
import {ActionType, AnyAction} from 'src/dashboard/state/settings/actions'

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.FETCH_SETTINGS_SUCCESS:
    return {...state, value: action.settings, loaded: true}
  case ActionType.UPDATE_SETTINGS_SUCCESS:
    return {...state, value: action.settings, saving: false}
  case ActionType.FETCH_SETTINGS_ERROR:
    return {...state, loadError: action.cause}
  case ActionType.UPDATE_SETTINGS_ERROR:
    return {...state, saveError: action.cause, saving: false}
  case ActionType.UPDATE_SETTINGS_REQUEST:
    return {...state,  saving: true}
  default:
    return state
  }
}