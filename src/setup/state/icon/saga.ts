import {Error as GrpcError} from 'grpc-web'

import {call, put, takeEvery} from 'redux-saga/effects'
import {ActionType, FetchIconsRequestAction} from './actions'

import config from '../../../config'
import {translateCommonFailureCode} from '../../../dashboard/state/common'
import {
  ListRealmIconsRequest,
  RealmIcon
} from '@joystack/protocol/realm/icon/icon_service_pb'
import {RealmIconServicePromiseClient} from '@joystack/protocol/realm/icon/icon_service_grpc_web_pb'

const client = new RealmIconServicePromiseClient(config.apiHost)

function translateFailureCode(code: number) {
  return translateCommonFailureCode(code)
}

function translateFailure(error: any) {
  const code = (error as GrpcError).code
  return translateFailureCode(code)
}

async function listIcons(): Promise<RealmIcon.AsObject[]> {
  const request = new ListRealmIconsRequest()
  const response = await client.list(request, {})
  return response.getIconsList().map(icon => icon.toObject())
}

export function* fetchIcons() {
  try {
    const icons = (yield call(listIcons)) as RealmIcon.AsObject[]
    yield put({type: ActionType.FETCH_ICONS_SUCCESS, icons})
  } catch (error) {
    yield put({type: ActionType.FETCH_ICONS_ERROR, cause: translateFailure(error)})
  }
}

export function *fetchIconsSaga() {
  yield takeEvery<FetchIconsRequestAction>(
    ActionType.FETCH_ICONS_REQUEST, fetchIcons)
}