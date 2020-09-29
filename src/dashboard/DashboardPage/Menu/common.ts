import {
  ListRealmsRequest,
  Realm
} from '@joystack/protocol/realm'
import {RealmServicePromiseClient} from '@joystack/protocol/realm'
import {Session} from '../../../login/state'
import config from '../../../config'

export async function findByRelativeId(session: Session, relativeId: number): Promise<Realm> {
  const client = new RealmServicePromiseClient(config.apiHost)
  const response = await client.list(
    new ListRealmsRequest().setOwnerId(session.accountId),
    {'Authentication': session.accessToken}
  )
  const realms = response.getRealmsList()
  if (relativeId >= realms.length) {
    throw new Error('not found')
  }
  console.log({realms, relative: relativeId, indexed: realms[relativeId]})
  return realms[relativeId]
}