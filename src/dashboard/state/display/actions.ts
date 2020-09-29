import {RealmDisplay} from '@joystack/protocol/realm/display'
import {State} from '../state'
import {ThunkAction} from 'redux-thunk'

export enum ActionType {
  WATCH_DISPLAY_UPDATES_REQUEST = '@@dashboard/WATCH_DISPLAY_UPDATES_REQUEST',
  FETCH_DISPLAY_SUCCESS = '@@dashboard/FETCH_DISPLAY_SUCCESS',
  FETCH_DISPLAY_ERROR = '@@dashboard/FETCH_DISPLAY_ERROR',
}

export interface FetchDisplayRequestAction {
  type: ActionType.WATCH_DISPLAY_UPDATES_REQUEST
  realmId: number
}

export interface FetchDisplaySuccessAction {
  type: ActionType.FETCH_DISPLAY_SUCCESS
  realmId: number
  display: RealmDisplay.AsObject
}

export interface FetchDisplayErrorAction {
  type: ActionType.FETCH_DISPLAY_ERROR
  realmId: number
  cause: string
}

export type AnyAction =
  | FetchDisplayRequestAction
  | FetchDisplaySuccessAction
  | FetchDisplayErrorAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>