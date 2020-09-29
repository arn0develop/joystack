import {Account} from '@joystack/protocol/user/account'

export interface Session {
  accountId: string
  refreshToken: string
  accessToken: string
}

export interface State {
  session: Session | null
  account: Account.AsObject | null
}

export const initialState: State = {
  session: null,
  account: null
}