import {Session, State} from './state'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {LoginResponse} from '@joystack/protocol/user/login'
import {Account} from '@joystack/protocol/user/account'

export enum ActionType {
  SUCCESSFUL_LOGIN = '@@account/SUCCESSFUL_LOGIN',
  FAILED_LOGIN = '@@account/FAILED_LOGIN',
  LOGOUT = '@@account/LOGOUT'
}

export interface SuccessfulLoginAction {
  type: ActionType.SUCCESSFUL_LOGIN
  payload: {
    session: Session
    account: Account.AsObject | null
  }
}

export interface FailedLoginAction {
  type: ActionType.FAILED_LOGIN
}

export interface LogoutAction {
  type: ActionType.LOGOUT
}

export type AnyAction = SuccessfulLoginAction | FailedLoginAction | LogoutAction
type Thunk<Action> = ThunkAction<Promise<Action>, State, undefined, AnyAction>

export function login(response: LoginResponse, account: Account | null): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    try {
      return dispatch({
        type: ActionType.SUCCESSFUL_LOGIN,
        payload: {
          session: {
            accessToken: response.getAccessToken(),
            accountId: response.getAccountId(),
            refreshToken: ''
          },
          account: account?.toObject() || null
        }
      })
    } catch (error) {
      return dispatch({type: ActionType.FAILED_LOGIN})
    }
  }
}

export function logout(): Thunk<AnyAction> {
  return async (dispatch: ThunkDispatch<State, undefined, AnyAction>) => {
    return dispatch({type: ActionType.LOGOUT})
  }
}