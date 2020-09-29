import {Error as GrpcError, StatusCode} from 'grpc-web'

import {call, put, select, takeEvery} from 'redux-saga/effects'
import {ActionType, FetchTypesRequestAction} from './actions'

import config from '../../../config'
import {translateCommonFailureCode} from '../../../dashboard/state/common'
import {
  RealmTypeServicePromiseClient,
  ListRealmTypesRequest,
  RealmType
} from '@joystack/protocol/realm/type'

const client = new RealmTypeServicePromiseClient(config.apiHost)

function translateFailureCode(code: number) {
  return translateCommonFailureCode(code)
}

function translateFailure(error: any) {
  const code = (error as GrpcError).code
  return translateFailureCode(code)
}

async function listTypes(): Promise<RealmType.AsObject[]> {
  const request = new ListRealmTypesRequest()
  const response = await client.list(request, {})
  return response.getTypesList().map(type => type.toObject())
}

export function* fetchTypes() {
  try {
    const types = (yield call(listTypes)) as RealmType.AsObject[]
    yield put({type: ActionType.FETCH_TYPES_SUCCESS, types})
  } catch (error) {
    yield put({type: ActionType.FETCH_TYPES_ERROR, cause: translateFailure(error)})
  }
}

export function *fetchTypesSaga() {
  yield takeEvery<FetchTypesRequestAction>(
    ActionType.FETCH_TYPES_REQUEST, fetchTypes)
}