import State, {initialState} from './state'
import {ActionType, AnyAction} from './action'
import {now} from 'moment'

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.EXECUTE_COMMAND_ERROR:
    return {...state, executeError: action.cause}
  case ActionType.EXECUTE_COMMAND_SUCCESS:
    return {...state, messages: [...state.messages, {message: action.command, time: now()}]}
  case ActionType.WATCH_CONSOLE_MESSAGES_ERROR:
    return {...state, streamError: action.cause}
  case ActionType.WATCH_CONSOLE_MESSAGES_NEXT:
    return {...state, messages: [...state.messages, action.message]}
  default:
    return state
  }
}