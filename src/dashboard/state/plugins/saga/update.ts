import config from '../../../../config'
import {Error as GrpcError, StatusCode} from 'grpc-web'
import {errors} from '../../../../errors'
import {
  createCallCredentials, selectSession,
  translateCommonFailureCode
} from '../../common'
import {Session} from '../../../../login/state'

import {put, call, select, takeEvery} from 'redux-saga/effects'
import {CombinedState} from '../../../../state'
import {
  AddPluginRequest,
  Plugin,
  RealmPluginsServicePromiseClient,
  RemovePluginRequest,
  UpdatePluginsRequest
} from '@joystack/protocol/realm/plugins'
import {
  ActionType,
  SinglePluginUpdateMethod,
  UpdatePluginListRequestAction,
  UpdateSinglePluginRequestAction,
  UpdateSinglePluginSuccessAction
} from '../actions'

const client = new RealmPluginsServicePromiseClient(config.apiHost)

function translateFailureCode(code: number) {
  switch (code) {
  case StatusCode.NOT_FOUND:
    return errors.realm.notFound
  case StatusCode.ALREADY_EXISTS:
    return errors.realm.alreadyExists
  default:
    return translateCommonFailureCode(code)
  }
}

function translateFailure(error: any) {
  const code = (error as GrpcError).code
  return translateFailureCode(code)
}

async function addPluginWithSession(session: Session, realmId: number, plugin: Plugin) {
  const request = new AddPluginRequest().setPlugin(plugin).setRealmId(realmId)
  const response = await client.add(request, createCallCredentials(session))
  return response.getPluginsList().map(plugin => plugin.getResourceId())
}

async function removePluginWithSession(session: Session, realmId: number, plugin: Plugin) {
  const request = new RemovePluginRequest().setPlugin(plugin).setRealmId(realmId)
  const response = await client.remove(request, createCallCredentials(session))
  return response.getPluginsList().map(plugin => plugin.getResourceId())
}

async function updateSinglePluginWithSession(
  session: Session,
  realmId: number,
  {pluginId, updateMethod}: UpdateSinglePluginRequestAction
): Promise<number[]> {
  const plugin = new Plugin().setResourceId(pluginId)
  return updateMethod === SinglePluginUpdateMethod.ADD
    ? addPluginWithSession(session, realmId, plugin)
    : removePluginWithSession(session, realmId, plugin)
}

function selectRealmId(state: CombinedState) {
  return state.dashboard.sidebar.active.realmId
}

export function* updateSinglePlugin(action: UpdateSinglePluginRequestAction) {
  const {pluginId: updatedPluginId, updateMethod} = action
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.UPDATE_SINGLE_PLUGIN_ERROR, cause: errors.session.none})
    return
  }
  try {
    const realmId = (yield select(selectRealmId)) as number | undefined
    if (!realmId) {
      yield put({
        type: ActionType.UPDATE_SINGLE_PLUGIN_ERROR,
        updatedPluginId,
        updateMethod,
        cause: errors.dashboard.noActiveRealm
      })
      return
    }
    const updatedPlugins = (yield call(updateSinglePluginWithSession, session, realmId, action)) as number[]
    yield put({
      type: ActionType.UPDATE_SINGLE_PLUGIN_SUCCESS,
      updatedPluginId,
      updateMethod,
      plugins: updatedPlugins
    })
  } catch (error) {
    yield put({
      type: ActionType.UPDATE_SINGLE_PLUGIN_ERROR,
      updatedPluginId,
      updateMethod,
      cause: translateFailure(error)
    })
  }
}

export function* updateSinglePluginSaga() {
  yield takeEvery<UpdateSinglePluginRequestAction>(
    ActionType.UPDATE_SINGLE_PLUGIN_REQUEST, updateSinglePlugin)
}

async function updatePluginListInSession(session: Session, realmId: number, pluginIds: number[]): Promise<number[]> {
  const request = new UpdatePluginsRequest()
    .setRealmId(realmId)
    .setPluginsList(pluginIds.map(plugin => new Plugin().setResourceId(plugin)))
  const response = await client.update(request, createCallCredentials(session))
  return response.getPluginsList().map(plugin => plugin.getResourceId())
}


export function* updatePluginList({plugins}: { plugins: number[] }) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.UPDATE_PLUGIN_LIST_ERROR, cause: errors.session.none})
    return
  }
  try {
    const realmId = (yield select(selectRealmId)) as number | undefined
    if (!realmId) {
      yield put({
        type: ActionType.UPDATE_PLUGIN_LIST_ERROR,
        cause: errors.dashboard.noActiveRealm
      })
      return
    }
    const updatedPlugins = (yield call(updatePluginListInSession, session, realmId, plugins)) as number[]
    yield put({
      type: ActionType.UPDATE_PLUGIN_LIST_SUCCESS,
      plugins: updatedPlugins
    })
  } catch (error) {
    yield put({
      type: ActionType.UPDATE_PLUGIN_LIST_ERROR,
      cause: translateFailure(error)
    })
  }
}

export function* updatePluginListSaga() {
  yield takeEvery<UpdatePluginListRequestAction>(
    ActionType.UPDATE_PLUGIN_LIST_REQUEST, updatePluginList)
}
