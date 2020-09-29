import {RealmIcon} from '@joystack/protocol/realm/icon'

export default interface State {
  icons: RealmIcon.AsObject[]
  loaded: boolean
  loading: boolean
  error: string
}

export const initialState: State = {
  icons: [],
  loaded: false,
  loading: false,
  error: ''
}