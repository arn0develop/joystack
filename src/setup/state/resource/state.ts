import {Resource} from '@joystack/protocol/realm/resource'

export default interface State {
  resources: Resource.AsObject[]
  loaded: boolean
  loading: boolean
  error: string
}

export const initialState: State = {
  resources: [],
  loaded: false,
  loading: false,
  error: ''
}