import {ConsoleMessage} from '@joystack/protocol/realm/console'

export default interface State {
  messages: ConsoleMessage.AsObject[]
  executeError: string
  streamError: string
}

export const initialState: State = {
  executeError: '',
  streamError: '',
  messages: []
}