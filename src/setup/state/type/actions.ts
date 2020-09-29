import {RealmType} from '@joystack/protocol/realm/type'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import State from './state'

export enum ActionType {
  FETCH_TYPES_REQUEST = '@@realm/FETCH_TYPES_REQUEST',
  FETCH_TYPES_SUCCESS = '@@realm/FETCH_TYPES_SUCCESS',
  FETCH_TYPES_ERROR = '@@realm/FETCH_TYPES_ERROR'
}
export interface FetchTypesRequestAction {
  type: ActionType.FETCH_TYPES_REQUEST
}

export interface FetchTypesSuccessAction {
  type: ActionType.FETCH_TYPES_SUCCESS
  types: RealmType.AsObject[]
}

export interface FetchTypesErrorAction {
  type: ActionType.FETCH_TYPES_ERROR
  cause: string
}

export type AnyAction =
  | FetchTypesSuccessAction
  | FetchTypesErrorAction
  | FetchTypesRequestAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function fetchTypes(): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.FETCH_TYPES_REQUEST})
  }
}