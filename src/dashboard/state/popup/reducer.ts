import State, { initialState } from './state'
import { ActionType, AnyAction } from './actions'

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.OPEN_POPUP:
    return { isPopupOpen: true }
  case ActionType.CLOSE_POPUP:
    return { isPopupOpen: false }
  default:
    return state
  }
}
