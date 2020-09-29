import {Error as GrpcError, StatusCode} from 'grpc-web'
import {Session} from '../../../../login/state'
import {
  FindRealmRequest,
  Realm,
  UpdateRealmRequest,
  RealmServicePromiseClient
} from '@joystack/protocol/realm'
import {
  createCallCredentials, selectSession,
  translateCommonFailureCode
} from '../../common'
import {ActionType, UpdateRealmStatusRequestAction} from '../actions'
import {put, call, select, takeEvery} from 'redux-saga/effects'
import config from 'src/config'
import orThrow from 'src/util/orThrow'
import {errors} from 'src/errors'
import {
  RealmStatus,
  RealmStatusServicePromiseClient, UpdateRealmStatusRequest
} from '@joystack/protocol/realm/status'

const client = new RealmStatusServicePromiseClient(config.apiHost)

function translateUpdateFailureCode(code: number) {
  switch (code) {
  case StatusCode.NOT_FOUND:
    return errors.realm.notFound
  default:
    return translateCommonFailureCode(code)
  }
}

function translateUpdateFailure(error: any) {
  return translateUpdateFailureCode((error as GrpcError).code)
}

async function updateRealmStatusInSession(
  session: Session,
  request: UpdateRealmStatusRequest.AsObject
): Promise<RealmStatus.AsObject> {
  try {
    const callCredentials = createCallCredentials(session)
    const requestMessage = new UpdateRealmStatusRequest()
      .setNotice(request.notice)
      .setRealmId(request.realmId)
      .setTargetStage(request.targetStage)
    const response = await client.update(requestMessage, callCredentials)
    return orThrow(response.getStatus()?.toObject(), () => new Error(errors.realm.notFound))
  } catch (error) {
    throw new Error(translateUpdateFailure(error))
  }
}

function* updateRealmStatus({request}: UpdateRealmStatusRequestAction) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.UPDATE_REALM_STATUS_ERROR, cause: errors.session.none})
    return
  }
  try {
    const status = yield call(updateRealmStatusInSession, session, request)
    yield put({type: ActionType.UPDATE_REALM_STATUS_SUCCESS, status})
  } catch (error) {
    yield put({type: ActionType.UPDATE_REALM_STATUS_ERROR, realmId: request.realmId, cause: error.message})
  }
}

export function *updateRealmStatusSaga() {
  yield takeEvery<UpdateRealmStatusRequestAction>(
    ActionType.UPDATE_REALM_STATUS_REQUEST,
    updateRealmStatus
  )
}