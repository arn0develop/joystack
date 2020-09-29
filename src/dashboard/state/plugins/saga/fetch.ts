import {put, select, call, takeEvery} from 'redux-saga/effects'
import {
  ActionType, FetchPluginsRequestAction,
  UpdatePluginListRequestAction,
  UpdateSinglePluginRequestAction
} from '../actions'
import {Session} from '../../../../login/state'
import {
  createCallCredentials, selectSession,
  translateCommonFailureCode
} from '../../common'
import {errors} from '../../../../errors'
import {updateSinglePlugin} from './update'
import {CombinedState} from '../../../../state'
import config from '../../../../config'
import {Error as GrpcError, StatusCode} from 'grpc-web'

import {
  ListPluginsRequest,
  RealmPluginsServicePromiseClient
} from '@joystack/protocol/realm/plugins'

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

async function fetchPlugins(session: Session, realmId: number): Promise<number[]> {
  const request = new ListPluginsRequest().setRealmId(realmId)
  const response = await client.list(request, createCallCredentials(session))
  return response.getPluginsList().map(plugin => plugin.getResourceId())
}

function selectRealmId(state: CombinedState) {
  return state.dashboard.sidebar.active.realmId
}

export function* fetchPluginList() {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.FETCH_PLUGINS_ERROR, cause: errors.session.none})
    return
  }
  try {
    const realmId = (yield select(selectRealmId)) as number | undefined
    if (!realmId) {
      yield put({
        type: ActionType.FETCH_PLUGINS_ERROR,
        cause: errors.dashboard.noActiveRealm
      })
      return
    }
    const updatedPlugins = (yield call(fetchPlugins, session, realmId)) as number[]
    yield put({type: ActionType.FETCH_PLUGINS_SUCCESS, plugins: updatedPlugins})
  } catch (error) {
    yield put({
      type: ActionType.FETCH_PLUGINS_ERROR,
      cause: translateFailure(error)
    })
  }
}

export function* fetchPluginListSaga() {
  yield takeEvery<FetchPluginsRequestAction>(
    ActionType.FETCH_PLUGINS_REQUEST, fetchPluginList)
}
