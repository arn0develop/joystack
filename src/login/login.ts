import {Account, FindAccountRequest} from '@joystack/protocol/user/account'
import {LoginRequest, LoginResponse} from '@joystack/protocol/user/login'
import {LoginServicePromiseClient} from '@joystack/protocol/user/login'
import {AccountServicePromiseClient} from '@joystack/protocol/user/account'
import config from 'src/config'

export interface Credentials {
  email: string
  password: string
}

export interface Login {
  response: LoginResponse
  account: Account
}

async function lookupAccount(id: string, accessToken: string): Promise<Account> {
  const request = new FindAccountRequest().setId(id)
  const client = new AccountServicePromiseClient(config.apiHost)
  const response = await client.find(request, {'Authentication': accessToken})
  if (response.getAccount() == null || response.getAccount() == undefined) {
    throw new Error('could not find account')
  }
  return response.getAccount()!
}

function createRequest(credentials: Credentials): LoginRequest {
  return new LoginRequest()
    .setEmail(credentials.email)
    .setPassword(credentials.password)
}

async function sendLoginRequest(credentials: Credentials): Promise<LoginResponse> {
  const request = createRequest(credentials)
  const client = new LoginServicePromiseClient(config.apiHost)
  return client.login(request, {})
}

export async function login(credentials: Credentials): Promise<Login> {
  const response = await sendLoginRequest(credentials)
  const account = await lookupAccount(response.getAccountId(), response.getAccessToken())
  return {response, account}
}