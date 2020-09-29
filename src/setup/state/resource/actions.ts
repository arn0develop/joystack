import {Resource} from '@joystack/protocol/realm/resource'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import State from './state'

export enum ActionType {
  FETCH_RESOURCES_REQUEST = '@@realm/FETCH_RESOURCES_REQUEST',
  FETCH_RESOURCES_SUCCESS = '@@realm/FETCH_RESOURCES_SUCCESS',
  FETCH_RESOURCES_ERROR = '@@realm/FETCH_RESOURCES_ERROR'
}
export interface FetchResourcesRequestAction {
  type: ActionType.FETCH_RESOURCES_REQUEST
}

export interface FetchResourcesSuccessAction {
  type: ActionType.FETCH_RESOURCES_SUCCESS
  resources: Resource.AsObject[]
}

export interface FetchResourcesErrorAction {
  type: ActionType.FETCH_RESOURCES_ERROR
  cause: string
}

export type AnyAction =
  | FetchResourcesSuccessAction
  | FetchResourcesErrorAction
  | FetchResourcesRequestAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function fetchResources(): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.FETCH_RESOURCES_REQUEST})
  }
}