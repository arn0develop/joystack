import {DomainName} from '@joystack/protocol/realm/domain'

export default interface State {
  domainNames: DomainName.AsObject[]
  loaded: boolean
  loading: boolean
  error: string
}

export const initialState: State = {
  domainNames: [],
  loaded: false,
  loading: false,
  error: ''
}