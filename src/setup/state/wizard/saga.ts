import {call, put, select, takeEvery} from 'redux-saga/effects'
import {RealmDescription, RealmDescriptionConflicts} from './state'
import {ActionType, UpdateRealmDescriptionRequest} from './actions'
import config from '../../../config'
import {
  ListRealmsRequest,
  RealmServicePromiseClient
} from '@joystack/protocol/realm'
import {
  RealmDomainServicePromiseClient, ValidateRealmDomainRequest
} from '@joystack/protocol/realm/domain'
import {Session} from '../../../login/state'
import {
  selectSession,
  translateCommonFailureCode
} from '../../../dashboard/state/common'
import {errors} from '../../../errors'
import {Error as GrpcError} from 'grpc-web'

function translateFailureCode(code: number) {
  return translateCommonFailureCode(code)
}

function translateFailure(error: any) {
  const code = (error as GrpcError).code
  return translateFailureCode(code)
}

const realmDomainClient = new RealmDomainServicePromiseClient(config.apiHost)
const realmClient = new RealmServicePromiseClient(config.apiHost)

async function isRealmDomainConflicting(description: RealmDescription): Promise<boolean> {
  const request = new ValidateRealmDomainRequest()
    .setFullName(`${description.name}.${description.domainName?.name}`)
  const response = await realmDomainClient.validate(request)
  return !response.getAvailable()
}

async function findRealmConflict(
  session: Session,
  description: RealmDescription
): Promise<boolean> {
  const request = new ListRealmsRequest()
    .setOwnerId(session.accountId)
    .setName(description.name)
  const response = await realmClient.list(request)
  return response.getRealmsList().length !== 0
}

async function findRealmConflictIfLoggedIn(
  session: Session | null,
  description: RealmDescription
): Promise<boolean> {
  if (session != null) {
    return findRealmConflict(session, description)
  }
  return false
}

async function findConflicts(
  session: Session | null,
  description: RealmDescription
): Promise<RealmDescriptionConflicts> {
  const domainConflict = isRealmDomainConflicting(description)
  const realmConflict = findRealmConflictIfLoggedIn(session, description)
  return {
    isDomainTaken: await domainConflict,
    isNameTaken: await realmConflict
  }
}

function* updateDescription({description}: {description: RealmDescription}) {
  const session = (yield select(selectSession)) as Session | null
  try {
    const conflicts = (yield call(findConflicts, session, description)) as RealmDescriptionConflicts
    console.log({conflicts})
    if (conflicts.isNameTaken || conflicts.isDomainTaken) {
      yield put({type: ActionType.UPDATE_REALM_DESCRIPTION_ERROR, conflicts, cause: errors.wizard.conflicts})
    } else {
      yield put({type: ActionType.UPDATE_REALM_DESCRIPTION_SUCCESS, description})
    }
  } catch (error) {
    yield put({
      type: ActionType.UPDATE_REALM_DESCRIPTION_ERROR,
      conflicts: {isDomainTaken: false, isNameTaken: false},
      cause: translateFailure(error)
    })
  }
}

export function* updateDescriptionSaga() {
  yield takeEvery<UpdateRealmDescriptionRequest>(
    ActionType.UPDATE_REALM_DESCRIPTION_REQUEST,
    updateDescription
  )
}