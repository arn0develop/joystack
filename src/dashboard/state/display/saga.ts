import config from '../../../config'
import {Error as GrpcError, StatusCode} from 'grpc-web'
import {errors} from '../../../errors'
import {
  createCallCredentials, selectSession,
  translateCommonFailureCode
} from '../common'
import {END, eventChannel} from 'redux-saga'
import {Session} from '../../../login/state'
import {ActionType, FetchDisplayRequestAction} from './actions'
import {
  cancelled,
  call,
  put,
  select,
  take,
  takeEvery
} from 'redux-saga/effects'
import {
  FindRealmDisplayRequest,
  RealmDisplay,
  RealmDisplayServiceClient
} from '@joystack/protocol/realm/display'

const client = new RealmDisplayServiceClient(config.apiHost)

function translateDisplayUpdateFailure(code: number) {
  switch (code) {
  case StatusCode.NOT_FOUND:
    return errors.realm.notFound
  default:
    return translateCommonFailureCode(code)
  }
}

const DEFAULT_REFRESH_INTERVAL = 2000

interface UpdateChannelSuccessEvent {
  type: 'success'
  display: RealmDisplay
}

interface UpdateChannelErrorEvent {
  type: 'error'
  cause: string
}

type UpdateChannelEvent = UpdateChannelErrorEvent | UpdateChannelSuccessEvent | END

function createDisplayUpdateChannel(
  session: Session,
  realmId: number,
  refreshInterval: number = DEFAULT_REFRESH_INTERVAL
) {
  return eventChannel(emit => {
    const request = new FindRealmDisplayRequest().setRealmId(realmId)
    const task = () => {
      client.find(request, createCallCredentials(session), (error, response) => {
        if (error) {
          const code = (error as GrpcError).code
          const cause = translateDisplayUpdateFailure(code)
          emit({type: 'error', cause})
        } else {
          emit({type: 'success', display: response.getDisplay()})
        }
      })
    }
    const interval = setInterval(task, refreshInterval)
    return () => clearInterval(interval)
  })
}

function* watchDisplayUpdatesForRealm({realmId}: FetchDisplayRequestAction) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.FETCH_DISPLAY_ERROR, cause: errors.session.none})
    return
  }
  const channel = yield call(createDisplayUpdateChannel, session, realmId)
  while (true) {
    try {
      const event = (yield take(channel)) as UpdateChannelEvent
      switch (event.type) {
      case 'error':
        yield put({type: ActionType.FETCH_DISPLAY_ERROR, cause: event.cause, realmId})
        break
      case 'success':
        yield put({type: ActionType.FETCH_DISPLAY_SUCCESS, display: event.display, realmId})
      }
    } finally {
      if (yield cancelled()) {
        channel.close()
      }
    }
  }
}

export function* watchForDisplayUpdates() {
  yield takeEvery<FetchDisplayRequestAction>(
    ActionType.WATCH_DISPLAY_UPDATES_REQUEST,
    watchDisplayUpdatesForRealm
  )
}