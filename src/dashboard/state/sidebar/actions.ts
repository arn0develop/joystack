import {Realm} from '@joystack/protocol/realm/index'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import State, {Project} from './state'
import {
  RealmStatus,
  UpdateRealmStatusRequest
} from '@joystack/protocol/realm/status'

export enum ActionType {
  FETCH_REALM_SUCCESS = '@@dashboard/FETCH_REALM_SUCCESS',
  FETCH_REALM_REQUEST = '@@dashboard/FETCH_REALM_REQUEST',
  FETCH_REALM_ERROR = '@@dashboard/FETCH_REALM_ERROR',
  FETCH_PROJECT_LIST_REQUEST = '@@dashboard/FETCH_PROJECT_LIST_REQUEST',
  FETCH_PROJECT_LIST_SUCCESS = '@@dashboard/FETCH_PROJECT_LIST_SUCCESS',
  FETCH_PROJECT_LIST_ERROR = '@@dashboard/FETCH_PROJECT_LIST_ERROR',
  FETCH_REALM_STATUS_REQUEST = '@@dashboard/FETCH_REALM_STATUS_REQUEST',
  FETCH_REALM_STATUS_SUCCESS = '@@dashboard/FETCH_REALM_STATUS_SUCCESS',
  FETCH_REALM_STATUS_ERROR = '@@dashboard/FETCH_REALM_STATUS_ERROR',
  WATCH_REALM_UPDATES_REQUEST = '@@dashboard/WATCH_REALM_UPDATES_REQUEST',
  WATCH_REALM_UPDATES_SUCCESS = '@@dashboard/WATCH_REALM_UPDATES_SUCCESS',
  WATCH_REALM_UPDATES_ERROR = '@@dashboard/WATCH_REALM_UPDATES_ERROR',
  UPDATE_REALM_STATUS_REQUEST = '@@dashboard/UPDATE_REALM_STATUS_REQUEST',
  UPDATE_REALM_STATUS_SUCCESS = '@@dashboard/UPDATE_REALM_STATUS_SUCCESS',
  UPDATE_REALM_STATUS_ERROR = '@@dashboard/UPDATE_REALM_STATUS_ERROR',
  CHANGE_ACTIVE_REALM_REQUEST = '@@dashboard/CHANGE_ACTIVE_REALM_REQUEST',
  CHANGE_ACTIVE_REALM_SUCCESS = '@@dashboard/CHANGE_ACTIVE_REALM_SUCCESS',
  CHANGE_ACTIVE_REALM_ERROR = '@@dashboard/CHANGE_ACTIVE_REALM_ERROR',
  TOGGLE_SIDEBAR = '@@dashboard/TOGGLE_SIDEBAR'
}

export interface ToggleSidebar {
  type: ActionType.TOGGLE_SIDEBAR
}

export interface FetchProjectListRequestAction {
  type: ActionType.FETCH_PROJECT_LIST_REQUEST
}

export interface FetchProjectListErrorAction {
  type: ActionType.FETCH_PROJECT_LIST_ERROR
  cause: string
}

export interface FetchProjectListSuccessAction {
  type: ActionType.FETCH_PROJECT_LIST_SUCCESS
  projects: Project[]
}

export interface UpdateRealmStatusRequestAction {
  type: ActionType.UPDATE_REALM_STATUS_REQUEST
  request: UpdateRealmStatusRequest.AsObject
}

export interface UpdateRealmStatusSuccessAction {
  type: ActionType.UPDATE_REALM_STATUS_SUCCESS
  status: RealmStatus.AsObject
}

export interface UpdateRealmStatusErrorAction {
  type: ActionType.UPDATE_REALM_STATUS_ERROR
  realmId: number
  cause: string
}

export interface ChangeActiveRealmRequestAction {
  type: ActionType.CHANGE_ACTIVE_REALM_REQUEST
  relativeId: number
}

export interface ChangeActiveRealmSuccessAction {
  type: ActionType.CHANGE_ACTIVE_REALM_SUCCESS
  relativeId: number
  realmId: number
}

export interface ChangeActiveRealmErrorAction {
  type: ActionType.CHANGE_ACTIVE_REALM_ERROR
  relativeId: number
  cause: string
}

export interface WatchRealmUpdatesRequestAction {
  type: ActionType.WATCH_REALM_UPDATES_REQUEST
  realmId: number
}

export interface FetchRealmStatusRequestAction {
  type: ActionType.FETCH_REALM_STATUS_REQUEST
  realmId: number
}

export interface FetchRealmStatusSuccessAction {
  type: ActionType.FETCH_REALM_STATUS_SUCCESS
  status: RealmStatus.AsObject
}

export interface FetchRealmStatusErrorAction {
  type: ActionType.FETCH_REALM_STATUS_ERROR
  realmId: number
  cause: string
}

export interface FetchRealmRequestAction {
  type: ActionType.FETCH_REALM_REQUEST
}

export interface FetchRealmErrorAction {
  type: ActionType.FETCH_REALM_ERROR
  cause: string
}

export interface FetchRealmSuccessAction {
  type: ActionType.FETCH_REALM_SUCCESS
  realms: Realm.AsObject[]
}

export interface WatchRealmUpdatesSuccessAction {
  type: ActionType.WATCH_REALM_UPDATES_SUCCESS
  status: RealmStatus.AsObject
}

export interface WatchRealmUpdatesErrorAction {
  type: ActionType.WATCH_REALM_UPDATES_ERROR
  realmId: number
  cause: string
}

export type AnyAction =
  | FetchProjectListErrorAction
  | FetchProjectListRequestAction
  | FetchProjectListSuccessAction
  | FetchRealmRequestAction
  | FetchRealmErrorAction
  | FetchRealmSuccessAction
  | UpdateRealmStatusRequestAction
  | UpdateRealmStatusSuccessAction
  | UpdateRealmStatusErrorAction
  | WatchRealmUpdatesRequestAction
  | WatchRealmUpdatesSuccessAction
  | WatchRealmUpdatesErrorAction
  | ChangeActiveRealmRequestAction
  | ChangeActiveRealmSuccessAction
  | ChangeActiveRealmErrorAction
  | FetchRealmStatusRequestAction
  | FetchRealmStatusErrorAction
  | FetchRealmStatusSuccessAction
  | ToggleSidebar

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function toggleSidebar(): ToggleSidebar {
  return {type: ActionType.TOGGLE_SIDEBAR}
}

export function fetchProjectList(): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.FETCH_PROJECT_LIST_REQUEST})
  }
}
export function updateRealmStatus(realmId: number, stage: RealmStatus.Stage): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    const request: UpdateRealmStatusRequest.AsObject = {
      realmId: realmId,
      targetStage: stage,
      notice: ''
    }
    return dispatch({type: ActionType.UPDATE_REALM_STATUS_REQUEST, realmId, request})
  }
}

export function subscribeRealmUpdates(realmId: number): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.WATCH_REALM_UPDATES_REQUEST, realmId})
  }
}

export function fetchRealmStatus(realmId: number): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.FETCH_REALM_STATUS_REQUEST, realmId})
  }
}