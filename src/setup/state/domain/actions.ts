import {DomainName} from '@joystack/protocol/realm/domain'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import State from './state'

export enum ActionType {
  FETCH_DOMAIN_NAMES_REQUEST = '@@realm/FETCH_DOMAIN_NAMES_REQUEST',
  FETCH_DOMAIN_NAMES_SUCCESS = '@@realm/FETCH_DOMAIN_NAMES_SUCCESS',
  FETCH_DOMAIN_NAMES_ERROR = '@@realm/FETCH_DOMAIN_NAMES_ERROR'
}
export interface FetchDomainNamesRequestAction {
  type: ActionType.FETCH_DOMAIN_NAMES_REQUEST
}

export interface FetchDomainNamesSuccessAction {
  type: ActionType.FETCH_DOMAIN_NAMES_SUCCESS
  domainNames: DomainName.AsObject[]
}

export interface FetchDomainNamesErrorAction {
  type: ActionType.FETCH_DOMAIN_NAMES_ERROR
  cause: string
}

export type AnyAction =
  | FetchDomainNamesSuccessAction
  | FetchDomainNamesErrorAction
  | FetchDomainNamesRequestAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function fetchDomainNames(): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.FETCH_DOMAIN_NAMES_REQUEST})
  }
}