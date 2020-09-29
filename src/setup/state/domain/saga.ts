import {Error as GrpcError} from 'grpc-web'

import {call, put, takeEvery} from 'redux-saga/effects'
import {ActionType, FetchDomainNamesRequestAction} from './actions'

import config from '../../../config'
import {translateCommonFailureCode} from '../../../dashboard/state/common'
import {
  ListDomainNameRequest,
  DomainNameServicePromiseClient,
  DomainName
} from '@joystack/protocol/realm/domain'

const client = new DomainNameServicePromiseClient(config.apiHost)

function translateFailureCode(code: number) {
  return translateCommonFailureCode(code)
}

function translateFailure(error: any) {
  const code = (error as GrpcError).code
  return translateFailureCode(code)
}

async function listDomainNames(): Promise<DomainName.AsObject[]> {
  const request = new ListDomainNameRequest()
  const response = await client.list(request, {})
  return response.getNamesList().map(domainName => domainName.toObject())
}

function* fetchDomainNames() {
  try {
    const domainNames = (yield call(listDomainNames)) as DomainName.AsObject[]
    yield put({type: ActionType.FETCH_DOMAIN_NAMES_SUCCESS, domainNames})
  } catch (error) {
    yield put({type: ActionType.FETCH_DOMAIN_NAMES_ERROR, cause: translateFailure(error)})
  }
}

export function *fetchDomainNamesSaga() {
  yield takeEvery<FetchDomainNamesRequestAction>(
    ActionType.FETCH_DOMAIN_NAMES_REQUEST, fetchDomainNames)
}