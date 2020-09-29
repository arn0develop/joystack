import {ThunkAction} from 'redux-thunk'
import {Resource} from '@joystack/protocol/realm/resource'
import {RealmIcon} from '@joystack/protocol/realm/icon'
import {RealmType} from '@joystack/protocol/realm/type'
import State, {RealmDescription, RealmDescriptionConflicts} from './state'

export enum ActionType {
  RESET = '@@wizard/RESET',
  ADD_RESOURCE = '@@wizard/ADD_RESOURCE',
  REMOVE_RESOURCE = '@@wizard/REMOVE_RESOURCE',
  UPDATE_REALM_DESCRIPTION_REQUEST = '@@wizard/UPDATE_REALM_DESCRIPTION_REQUEST',
  UPDATE_REALM_DESCRIPTION_SUCCESS = '@@wizard/UPDATE_REALM_DESCRIPTION_SUCCESS',
  UPDATE_REALM_DESCRIPTION_ERROR = '@@wizard/UPDATE_REALM_DESCRIPTION_ERROR',
  UPDATE_ICON = '@@wizard/UPDATE_ICON',
  UPDATE_TYPE = '@@wizard/UPDATE_TYPE'
}

export interface ResetAction {
  type: ActionType.RESET
}

export interface AddResourceAction {
  type: ActionType.ADD_RESOURCE
  resource: Resource.AsObject
}

export interface RemoveResourceAction {
  type: ActionType.REMOVE_RESOURCE
  resource: Resource.AsObject
}

export interface UpdateIconAction {
  type: ActionType.UPDATE_ICON
  icon?: RealmIcon.AsObject
}

export interface UpdateTypeAction {
  type: ActionType.UPDATE_TYPE
  realmType: RealmType.AsObject
}

export interface UpdateRealmDescriptionRequest {
  type: ActionType.UPDATE_REALM_DESCRIPTION_REQUEST
  description: RealmDescription
}

export interface UpdateRealmDescriptionSuccess {
  type: ActionType.UPDATE_REALM_DESCRIPTION_SUCCESS
  description: RealmDescription
}

export interface UpdateRealmDescriptionError {
  type: ActionType.UPDATE_REALM_DESCRIPTION_ERROR
  conflicts: RealmDescriptionConflicts
  cause: string
}

export type AnyAction =
  | ResetAction
  | AddResourceAction
  | RemoveResourceAction
  | UpdateTypeAction
  | UpdateRealmDescriptionRequest
  | UpdateRealmDescriptionSuccess
  | UpdateRealmDescriptionError
  | UpdateIconAction

type Thunk<Action> = ThunkAction<Action, State, undefined, AnyAction>

export function reset(): Thunk<AnyAction> {
  return dispatch => dispatch({type: ActionType.RESET})
}

export function addResource(resource: Resource.AsObject): Thunk<AnyAction> {
  return dispatch => dispatch({type: ActionType.ADD_RESOURCE, resource})
}

export function removeResource(resource: Resource.AsObject): Thunk<AnyAction> {
  return dispatch => dispatch({type: ActionType.REMOVE_RESOURCE, resource})
}

export function updateIcon(icon: RealmIcon.AsObject): Thunk<AnyAction> {
  return dispatch => dispatch({type: ActionType.UPDATE_ICON, icon})
}

export function updateType(realmType: RealmType.AsObject): Thunk<AnyAction> {
  return dispatch => dispatch({type: ActionType.UPDATE_TYPE, realmType})
}

export function updateDescription(description: RealmDescription): Thunk<AnyAction> {
  return dispatch => dispatch({type: ActionType.UPDATE_REALM_DESCRIPTION_REQUEST, description})
}