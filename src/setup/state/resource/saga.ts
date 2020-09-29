import {Error as GrpcError, StatusCode} from 'grpc-web'

import {call, put, select, takeEvery} from 'redux-saga/effects'
import {ActionType, FetchResourcesRequestAction} from './actions'
import {
  ListResourceRequest,
  Resource,
  ResourceServicePromiseClient
} from '@joystack/protocol/realm/resource'
import config from '../../../config'
import {translateCommonFailureCode} from '../../../dashboard/state/common'

const client = new ResourceServicePromiseClient(config.apiHost)

function translateFailureCode(code: number) {
  return translateCommonFailureCode(code)
}

function translateFailure(error: any) {
  const code = (error as GrpcError).code
  return translateFailureCode(code)
}

async function listResources(): Promise<Resource.AsObject[]> {
  const request = new ListResourceRequest().setFeatured(true)
  const response = await client.list(request, {})
  return response.getResourcesList().map(resource => resource.toObject())
}

export function* fetchResources() {
  try {
    const resources = (yield call(listResources)) as Resource.AsObject[]
    yield put({type: ActionType.FETCH_RESOURCES_SUCCESS, resources})
  } catch (error) {
    yield put({type: ActionType.FETCH_RESOURCES_ERROR, cause: translateFailure(error)})
  }
}

export function *fetchResourcesSaga() {
  yield takeEvery<FetchResourcesRequestAction>(
    ActionType.FETCH_RESOURCES_REQUEST, fetchResources)
}