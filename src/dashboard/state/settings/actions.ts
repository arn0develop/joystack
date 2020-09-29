import {RealmSettings} from '@joystack/protocol/realm/settings'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {initialState, State} from 'src/dashboard/state'

export enum ActionType {
  UPDATE_SETTINGS_REQUEST = '@@dashboard/UPDATE_SETTINGS_REQUEST',
  UPDATE_SETTINGS_SUCCESS = '@@dashboard/UPDATE_SETTINGS_SUCCESS',
  UPDATE_SETTINGS_ERROR = '@@dashboard/UPDATE_SETTINGS_ERROR',
  FETCH_SETTINGS_REQUEST = '@@dashboard/FETCH_SETTINGS_REQUEST',
  FETCH_SETTINGS_SUCCESS = '@@dashboard/FETCH_SETTINGS_SUCCESS',
  FETCH_SETTINGS_ERROR = '@@dashboard/FETCH_SETTINGS_ERROR'
}

export interface FullSettingsUpdate {
  name: 'full'
  settings: RealmSettings.AsObject
}

export interface PartialSettingsUpdate {
  name: 'partial'
  properties: Partial<RealmSettings.AsObject>
}

export type SettingsUpdate = FullSettingsUpdate | PartialSettingsUpdate

export interface UpdateSettingsRequestAction {
  type: ActionType.UPDATE_SETTINGS_REQUEST
  realmId: number
  update: SettingsUpdate
}

export interface UpdateSettingsSuccessAction {
  type: ActionType.UPDATE_SETTINGS_SUCCESS
  realmId: number
  settings: RealmSettings.AsObject
}

export interface UpdateSettingsErrorAction {
  type: ActionType.UPDATE_SETTINGS_ERROR
  realmId: number
  cause: string
}

export interface FetchSettingsRequestAction {
  type: ActionType.FETCH_SETTINGS_REQUEST
  realmId: number
}

export interface FetchSettingsSuccessAction {
  type: ActionType.FETCH_SETTINGS_SUCCESS
  realmId: number
  settings: RealmSettings.AsObject
}

export interface FetchSettingsErrorAction {
  type: ActionType.FETCH_SETTINGS_ERROR
  realmId: number
  cause: string
}

export type AnyAction =
  | UpdateSettingsRequestAction
  | UpdateSettingsSuccessAction
  | UpdateSettingsErrorAction
  | FetchSettingsSuccessAction
  | FetchSettingsErrorAction
  | FetchSettingsRequestAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function fetchSettings(realmId: number): Thunk<AnyAction> {
  console.log('000000')
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.FETCH_SETTINGS_REQUEST, realmId})
  }
}

export function updateSettings(realmId: number, update: SettingsUpdate): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.UPDATE_SETTINGS_REQUEST, realmId, update})
  }
}

export function resetSettings(realmId: number): Thunk<AnyAction> {
  return updateSettings(realmId, {name: 'full', settings: initialState.settings.value})
}