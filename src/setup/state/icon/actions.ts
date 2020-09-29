import {RealmIcon} from '@joystack/protocol/realm/icon'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import State from './state'

export enum ActionType {
  FETCH_ICONS_REQUEST = '@@realm/FETCH_ICONS_REQUEST',
  FETCH_ICONS_SUCCESS = '@@realm/FETCH_ICONS_SUCCESS',
  FETCH_ICONS_ERROR = '@@realm/FETCH_ICONS_ERROR'
}
export interface FetchIconsRequestAction {
  type: ActionType.FETCH_ICONS_REQUEST
}

export interface FetchIconsSuccessAction {
  type: ActionType.FETCH_ICONS_SUCCESS
  icons: RealmIcon.AsObject[]
}

export interface FetchIconsErrorAction {
  type: ActionType.FETCH_ICONS_ERROR
  cause: string
}

export type AnyAction =
  | FetchIconsSuccessAction
  | FetchIconsErrorAction
  | FetchIconsRequestAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function fetchIcons(): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.FETCH_ICONS_REQUEST})
  }
}