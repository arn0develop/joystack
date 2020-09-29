import {Session} from '../../login/state'
import {Metadata} from 'grpc-web'

export default function(session: Session): Metadata {
  return {'Authentication': session.accessToken}
}