import {RealmDisplay} from '@joystack/protocol/realm/display/display_service_pb'

export interface Entry {
  realmId: number
  display: RealmDisplay.AsObject
}

export default interface State {
  entries: Entry[]
  error: string
}

export const initialState: State = {
  error: '',
  entries: []
}