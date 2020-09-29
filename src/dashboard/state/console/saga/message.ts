import config from '../../../../config'
import {Error as GrpcError} from 'grpc-web'
import {
  createCallCredentials, selectSession,
  translateCommonFailureCode
} from '../../common'
import {END, EventChannel, eventChannel} from 'redux-saga'
import {Session} from '../../../../login/state'
import {
  call,
  cancelled,
  put,
  select,
  take,
  takeEvery
} from 'redux-saga/effects'

import {errors} from '../../../../errors'
import {CombinedState} from '../../../../state'
import {
  ConsoleMessage,
  ConsoleMessageServiceClient, WatchConsoleMessageRequest
} from '@joystack/protocol/realm/console'
import {ActionType, WatchConsoleMessagesRequestAction} from '../action'

const client = new ConsoleMessageServiceClient(config.apiHost)

function translateWatchFailure(error: any) {
  const code = (error as GrpcError).code
  return translateCommonFailureCode(code)
}

interface ConsoleMessageSuccessEvent {
  type: 'success'
  message: ConsoleMessage.AsObject
}

interface ConsoleMessageErrorEvent {
  type: 'error'
  cause: string
}

type ConsoleMessageEvent = ConsoleMessageSuccessEvent | ConsoleMessageErrorEvent | END

function handleUpdateError(emit: (event: ConsoleMessageEvent) => void , error: GrpcError, realmId: number) {
  const code = (error as GrpcError).code
  emit({type: 'error', cause: translateWatchFailure(code)})
}

function createRealmUpdateChannel(session: Session, realmId: number)  {
  return eventChannel(emit => {
    const request = new WatchConsoleMessageRequest().setRealmId(realmId)
    const stream = client.watch(request,  createCallCredentials(session))
      .on('data', message => emit({type: 'success', message: message.getMessage()?.toObject()}))
      .on('error', error => handleUpdateError(emit, error, realmId))
      .on('end', () => emit(END))
    return () => stream.cancel()
  })
}

function* watchConsoleMessagesForRealm(realmId: number) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.EXECUTE_COMMAND_ERROR, cause: errors.session.none})
    return
  }
  const channel = (yield call(createRealmUpdateChannel, session, realmId)) as EventChannel<ConsoleMessageEvent>
  try {
    while (true) {
      const event = (yield take(channel)) as ConsoleMessageEvent
      switch (event.type) {
      case 'success': {
        const message = event.message
        if (message) {
          yield put({type: ActionType.WATCH_CONSOLE_MESSAGES_NEXT, message})
          break
        }
        yield put({type: ActionType.WATCH_CONSOLE_MESSAGES_ERROR, cause: errors.realm.notFound})
        break
      }
      case 'error':
        yield put({type: ActionType.WATCH_CONSOLE_MESSAGES_ERROR, cause: event.cause})
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

function* watchForConsoleMessagesUntilIdChanges() {
  const realmId = (yield select(selectRealmId)) as number | undefined
  if (!realmId) {
    yield put({type: ActionType.WATCH_CONSOLE_MESSAGES_ERROR, cause: errors.dashboard.noActiveRealm})
    return
  }
  while (true) {
    try {
      yield call(watchConsoleMessagesForRealm, realmId)
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

export function* consoleMessageSaga() {
  yield takeEvery<WatchConsoleMessagesRequestAction>(
    ActionType.WATCH_CONSOLE_MESSAGES_REQUEST,
    watchForConsoleMessagesUntilIdChanges
  )
}