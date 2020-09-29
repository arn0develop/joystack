import {initialState, State} from './state'
import {ActionType, AnyAction} from './actions'

export function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.SUCCESSFUL_LOGIN:
    return { account: action.payload.account, session: action.payload.session }
  case ActionType.LOGOUT:
    return { account: null, session: null }
  case ActionType.FAILED_LOGIN:
    return state
  }
  return state
}