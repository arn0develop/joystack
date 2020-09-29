import {Session} from '../../../../login/state'
import {
  ListRealmsRequest,
  Realm,
  RealmServicePromiseClient
} from '@joystack/protocol/realm/index'

import {
  createCallCredentials,
  selectSession,
  translateCommonFailureCode
} from '../../common'

import {Error as GrpcError} from 'grpc-web'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {ActionType, FetchRealmStatusRequestAction} from '../actions'
import config from 'src/config'
import {Project} from '../state'
import {errors} from '../../../../errors'
import {
  FindRealmStatusRequest,
  RealmStatus,
  RealmStatusServicePromiseClient
} from '@joystack/protocol/realm/status'
import orThrow from '../../../../util/orThrow'

const client = new RealmServicePromiseClient(config.apiHost)

function translateListFailureCode(code: number) {
  return translateCommonFailureCode(code)
}

function translateListFailure(error: any) {
  return translateListFailureCode((error as GrpcError).code)
}

async function listRealmsWithSession(session: Session): Promise<Realm.AsObject[]> {
  try {
    const request = new ListRealmsRequest().setOwnerId(session.accountId)
    const response = await client.list(request, createCallCredentials(session))
    return response.getRealmsList().map(realm => realm.toObject())
  } catch (error) {
    throw new Error(translateListFailure(error))
  }
}

function mapRealmToProject(realm: Realm.AsObject, index: number): Project {
  return {
    key: `realm-${index}`,
    name: realm.name,
    owner: realm.ownerId,
    description: realm.descriptionText || 'Joystack Project',
    icon: 'https://media.joystack.com/servericons/joystack-logo.png',
    realm: {
      relativeId: index,
      uniqueId: realm.id,
    },
    status: {
      realmId: realm.id,
      lastUpdate: 0,
      notice: '',
      stage: RealmStatus.Stage.UNKNOWN
    }
  }
}

function mapRealmsToProjects(realms: Realm.AsObject[]): Project[] {
  return realms.slice()
    .sort((left, right) => left.id - right.id)
    .map((realm, index) => mapRealmToProject(realm, index))
}

function* fetchProjectList() {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.FETCH_PROJECT_LIST_ERROR, cause: errors.dashboard.noActiveRealm})
    return
  }
  try {
    const realms = yield call(listRealmsWithSession, session)
    const projects = mapRealmsToProjects(realms as Realm.AsObject[])
    yield put({type: ActionType.FETCH_PROJECT_LIST_SUCCESS, projects})
  } catch (error) {
    yield put({type: ActionType.FETCH_PROJECT_LIST_ERROR, cause: error.message})
  }
}

export function  *fetchProjectListSaga() {
  yield takeEvery(ActionType.FETCH_PROJECT_LIST_REQUEST, fetchProjectList)
}

const statusServiceClient = new RealmStatusServicePromiseClient(config.apiHost)

async function fetchStatusInSession(session: Session, realmId: number): Promise<RealmStatus.AsObject> {
  try {
    const request = new FindRealmStatusRequest().setRealmId(realmId)
    const response = await statusServiceClient.find(request, createCallCredentials(session))
    return orThrow(response.getStatus()?.toObject(), () => new Error('null'))
  } catch (error) {
    throw new Error(translateListFailure(error))
  }
}

function* fetchStatus({realmId}: {realmId: number}) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.FETCH_REALM_STATUS_ERROR, realmId, cause: errors.dashboard.noActiveRealm})
    return
  }
  try {
    const status = yield call(fetchStatusInSession, session, realmId)
    yield put({type: ActionType.FETCH_REALM_STATUS_SUCCESS, status})
  } catch (error) {
    yield put({type: ActionType.FETCH_REALM_STATUS_ERROR, realmId, cause: error.message})
  }
}

export function *fetchRealmStatusSaga() {
  yield takeEvery<FetchRealmStatusRequestAction>(ActionType.FETCH_REALM_STATUS_REQUEST, fetchStatus)
}