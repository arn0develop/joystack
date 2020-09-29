import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {State} from '../state'

export enum ActionType {
  FETCH_PLUGINS_REQUEST = '@@dashboard/FETCH_PLUGINS_REQUEST',
  FETCH_PLUGINS_SUCCESS = '@@dashboard/FETCH_PLUGINS_SUCCESS',
  FETCH_PLUGINS_ERROR = '@@dashboard/FETCH_PLUGINS_ERROR',
  UPDATE_PLUGIN_LIST_REQUEST = '@@dashboard/UPDATE_PLUGIN_LIST_REQUEST',
  UPDATE_PLUGIN_LIST_SUCCESS = '@@dashboard/UPDATE_PLUGIN_LIST_SUCCESS',
  UPDATE_PLUGIN_LIST_ERROR = '@@dashboard/UPDATE_PLUGIN_LIST_ERROR',
  UPDATE_SINGLE_PLUGIN_REQUEST = '@@dashboard/UPDATE_SINGLE_PLUGIN_REQUEST',
  UPDATE_SINGLE_PLUGIN_SUCCESS = '@@dashboard/UPDATE_SINGLE_PLUGIN_SUCCESS',
  UPDATE_SINGLE_PLUGIN_ERROR = '@@dashboard/UPDATE_SINGLE_PLUGIN_ERROR'
}

export interface FetchPluginsRequestAction {
  type: ActionType.FETCH_PLUGINS_REQUEST
}

export interface FetchPluginsErrorAction {
  type: ActionType.FETCH_PLUGINS_ERROR
  cause: string
}

export interface FetchPluginsSuccessAction {
  type: ActionType.FETCH_PLUGINS_SUCCESS
  plugins: number[]
}

export interface UpdatePluginListRequestAction {
  type: ActionType.UPDATE_PLUGIN_LIST_REQUEST
  plugins: number[]
}

export interface UpdatePluginListSuccessAction {
  type: ActionType.UPDATE_PLUGIN_LIST_SUCCESS
  plugins: number[]
}

export interface UpdatePluginListErrorAction {
  type: ActionType.UPDATE_PLUGIN_LIST_ERROR
  cause: string
}

export enum SinglePluginUpdateMethod {
  ADD,
  REMOVE
}

export interface UpdateSinglePluginRequestAction {
  type: ActionType.UPDATE_SINGLE_PLUGIN_REQUEST
  pluginId: number
  updateMethod: SinglePluginUpdateMethod
}

export interface UpdateSinglePluginSuccessAction {
  type: ActionType.UPDATE_SINGLE_PLUGIN_SUCCESS
  updatedPluginId: number
  updateMethod: SinglePluginUpdateMethod
  plugins: number[]
}

export interface UpdateSinglePluginErrorAction {
  type: ActionType.UPDATE_SINGLE_PLUGIN_ERROR
  updatedPluginId: number
  updateMethod: SinglePluginUpdateMethod
  cause: string
}

export type AnyAction =
  | FetchPluginsRequestAction
  | FetchPluginsErrorAction
  | FetchPluginsSuccessAction
  | UpdatePluginListRequestAction
  | UpdatePluginListSuccessAction
  | UpdatePluginListErrorAction
  | UpdateSinglePluginRequestAction
  | UpdateSinglePluginSuccessAction
  | UpdateSinglePluginErrorAction

type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function fetchPlugins(): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.FETCH_PLUGINS_REQUEST})
  }
}

export function updateSinglePlugin(
  pluginId: number,
  updateMethod: SinglePluginUpdateMethod
): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.UPDATE_SINGLE_PLUGIN_REQUEST, pluginId, updateMethod})
  }
}

export function updatePluginList(plugins: number[]): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.UPDATE_PLUGIN_LIST_REQUEST, plugins})
  }
}