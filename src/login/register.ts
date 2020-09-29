import {RegisterRequest, RegisterServicePromiseClient} from '@joystack/protocol/user/register'
import config from 'src/config'

export interface Registration {
  name: string
  email: string
  password: string
}

function createRequest(registration: Registration): RegisterRequest {
  return new RegisterRequest()
    .setEmail(registration.email)
    .setName(registration.name)
    .setPassword(registration.password)
}

const client = new RegisterServicePromiseClient(config.apiHost)

export async function register(registration: Registration) {
  const request = createRequest(registration)
  await client.register(request)
}