import {CombinedState} from '../../state'
import {Session} from '../../login/state'
import {Metadata, StatusCode} from 'grpc-web'
import {errors} from '../../errors'
import {call, select, put} from 'redux-saga/effects'
import {ActionType} from './settings/actions'

export function selectSession(state: CombinedState): Session | null {
  return state.account.session
}

export function createCallCredentials(session: Session): Metadata {
  return {'Authentication': session.accessToken}
}

export function translateCommonFailureCode(code: number) {
  switch (code) {
  case StatusCode.INTERNAL:
    return errors.backend.internal
  case StatusCode.UNAUTHENTICATED:
    return errors.session.invalid
  case StatusCode.PERMISSION_DENIED:
    return errors.session.notPermitted
  case StatusCode.CANCELLED:
  case StatusCode.UNKNOWN:
  case StatusCode.UNIMPLEMENTED:
    return errors.backend.unavailable
  case StatusCode.ABORTED:
    return errors.backend.timeout
  default:
    return errors.unknown
  }
}
