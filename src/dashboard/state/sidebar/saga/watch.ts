import {Error as GrpcError, StatusCode} from 'grpc-web'
import {errors} from 'src/errors'
import config from 'src/config'
import {
  createCallCredentials, selectSession,
  translateCommonFailureCode
} from '../../common'
import {Session} from 'src/login/state'
import {RealmServicePromiseClient, Realm} from '@joystack/protocol/realm'
import {
  call,
  cancelled,
  put,
  select,
  take,
  takeEvery
} from 'redux-saga/effects'
import {ActionType, WatchRealmUpdatesRequestAction} from '../actions'
import {END, EventChannel, eventChannel} from 'redux-saga'
import {CombinedState} from 'src/state'
import {
  RealmStatusServicePromiseClient, RealmStatusUpdate,
  WatchRealmStatusUpdateRequest
} from '@joystack/protocol/realm/status'

const client = new RealmStatusServicePromiseClient(config.apiHost)

function translateWatchFailure(error: any) {
  const code = (error as GrpcError).code
  return translateCommonFailureCode(code)
}

interface StatusUpdateSuccessEvent {
  type: 'success'
  update: RealmStatusUpdate.AsObject | null
}

interface StatusUpdateErrorEvent {
  type: 'error'
  cause: string
  realmId: number
}

type StatusUpdateEvent = StatusUpdateSuccessEvent | StatusUpdateErrorEvent | END

function handleUpdateError(emit: (event: StatusUpdateEvent) => void , error: GrpcError, realmId: number) {
  const code = (error as GrpcError).code
  emit({type: 'error', realmId, cause: translateWatchFailure(code)})
}

function createRealmUpdateChannel(
  realmId: number,
  session: Session
)  {
  return eventChannel(emit => {
    const request = new WatchRealmStatusUpdateRequest().addRealmIds(realmId)
    const stream = client.watch(request,  createCallCredentials(session))
      .on('data', message => emit({type: 'success', status: message.toObject()}))
      .on('error', error => handleUpdateError(emit, error, realmId))
      .on('end', () => emit(END))
    return () => stream.cancel()
  })
}

function* watchForRealmUpdatesWithSession(session: Session, realmId: number) {
  const channel = (yield call(createRealmUpdateChannel, realmId, session)) as EventChannel<StatusUpdateEvent>
  try {
    while (true) {
      const event = (yield take(channel)) as StatusUpdateEvent
      switch (event.type) {
      case 'success': {
        const status = event.update?.status
        if (status) {
          yield put({type: ActionType.WATCH_REALM_UPDATES_SUCCESS, status: status})
          break
        }
        yield put({type: ActionType.WATCH_REALM_UPDATES_ERROR, realmId, cause: errors.realm.notFound})
        break
      }
      case 'error':
        yield put({type: ActionType.WATCH_REALM_UPDATES_ERROR, realmId, cause: event.cause})
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

function selectRealmId(state: CombinedState) {
  return state.dashboard.sidebar.active.realmId
}

function* watchForRealmUpdatesUntilIdChanges({realmId}: WatchRealmUpdatesRequestAction) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.WATCH_REALM_UPDATES_ERROR, cause: errors.session.none})
    return
  }
  while (true) {
    try {
      yield call(watchForRealmUpdatesWithSession, session, realmId)
    } catch (error) {
      if (error !== END) {
        console.log({message: 'failed to watch for updates', error})
      }
    }
    const updatedRealmId = (yield select(selectRealmId)) as number | undefined
    if (!updatedRealmId || updatedRealmId !== realmId) {
      return
    }
  }
}

export function* realmUpdatesSaga() {
  yield takeEvery<WatchRealmUpdatesRequestAction>(
    ActionType.WATCH_REALM_UPDATES_REQUEST,
    watchForRealmUpdatesUntilIdChanges
  )
}
