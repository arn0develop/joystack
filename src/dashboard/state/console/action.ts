import {State} from '../state'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {ConsoleMessage} from '@joystack/protocol/realm/console'

export enum ActionType {
  EXECUTE_COMMAND_REQUEST = '@@dashboard/EXECUTE_COMMAND_REQUEST',
  EXECUTE_COMMAND_SUCCESS = '@@dashboard/EXECUTE_COMMAND_SUCCESS',
  EXECUTE_COMMAND_ERROR = '@@dashboard/EXECUTE_COMMAND_ERROR',
  WATCH_CONSOLE_MESSAGES_REQUEST = '@@dashboard/WATCH_CONSOLE_MESSAGES_REQUEST',
  WATCH_CONSOLE_MESSAGES_NEXT = '@@dashboard/WATCH_CONSOLE_MESSAGES_NEXT',
  WATCH_CONSOLE_MESSAGES_ERROR = '@@dashboard/WATCH_CONSOLE_MESSAGES_ERROR'
}

export interface ExecuteCommandRequestAction {
  type: ActionType.EXECUTE_COMMAND_REQUEST
  command: string
}

export interface ExecuteCommandSuccessAction {
  type: ActionType.EXECUTE_COMMAND_SUCCESS
  command: string
}

export interface ExecuteCommandErrorAction {
  type: ActionType.EXECUTE_COMMAND_ERROR
  command: string
  cause: string
}

export interface WatchConsoleMessagesRequestAction {
  type: ActionType.WATCH_CONSOLE_MESSAGES_REQUEST
}

export interface WatchConsoleMessagesNextAction {
  type: ActionType.WATCH_CONSOLE_MESSAGES_NEXT
  message: ConsoleMessage.AsObject
}

export interface WatchConsoleMessagesErrorAction {
  type: ActionType.WATCH_CONSOLE_MESSAGES_ERROR
  cause: string
}

export type AnyAction =
  | ExecuteCommandRequestAction
  | ExecuteCommandSuccessAction
  | ExecuteCommandErrorAction
  | WatchConsoleMessagesRequestAction
  | WatchConsoleMessagesNextAction
  | WatchConsoleMessagesErrorAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function executeCommand(command: string): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.EXECUTE_COMMAND_REQUEST, command})
  }
}

export function subscribeConsoleMessages(): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.WATCH_CONSOLE_MESSAGES_REQUEST})
  }
}