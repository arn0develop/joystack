import {RealmType} from '@joystack/protocol/realm/type'

export default interface State {
  types: RealmType.AsObject[]
  loaded: boolean
  loading: boolean
  error: string
}

export const initialState: State = {
  types: [],
  loaded: false,
  loading: false,
  error: ''
}