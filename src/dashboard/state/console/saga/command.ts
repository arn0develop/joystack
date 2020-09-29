import config from '../../../../config'
import {Error as GrpcError, StatusCode} from 'grpc-web'
import {errors} from '../../../../errors'
import {
  createCallCredentials,
  selectSession,
  translateCommonFailureCode
} from '../../common'
import {Session} from '../../../../login/state'
import {put, call, select, takeEvery} from 'redux-saga/effects'
import {ActionType, ExecuteCommandRequestAction} from '../action'
import {CombinedState} from '../../../../state'
import {
  ConsoleCommandServicePromiseClient,
  ExecuteCommandRequest
} from '@joystack/protocol/realm/console'

const client = new ConsoleCommandServicePromiseClient(config.apiHost)

function translateExecuteFailureCode(code: number) {
  switch (code) {
  case StatusCode.NOT_FOUND:
    return errors.realm.notFound
  default:
    return translateCommonFailureCode(code)
  }
}

function translateExecuteFailure(error: any) {
  return translateExecuteFailureCode((error as GrpcError).code)
}

async function executeWithSession(session: Session, command: string, realmId: number): Promise<any> {
  try {
    const request = new ExecuteCommandRequest()
      .setCommand(command)
      .setRealmId(realmId)
    await client.execute(request, createCallCredentials(session))
  } catch (error) {
    throw new Error(translateExecuteFailure(error))
  }
}

function selectActiveRealm(state: CombinedState) {
  return state.dashboard.sidebar.active.realmId
}

export function* executeCommand({ command }: { command: string }) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.EXECUTE_COMMAND_ERROR, cause: errors.session.none})
    return
  }
  try {
    const realmId = (yield select(selectActiveRealm)) as number | undefined
    if (realmId) {
      yield call(executeWithSession, session, command, realmId)
      yield put({type: ActionType.EXECUTE_COMMAND_SUCCESS, command})
    } else {
      yield put({type: ActionType.EXECUTE_COMMAND_ERROR, cause: errors.dashboard.noActiveRealm })
    }
  } catch (error) {
    yield put({type: ActionType.EXECUTE_COMMAND_ERROR, command, cause: error.message})
  }
}

export function *executeCommandSaga() {
  yield takeEvery<ExecuteCommandRequestAction>(
    ActionType.EXECUTE_COMMAND_REQUEST,
    executeCommand
  )
}