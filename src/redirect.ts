import {store} from './state'
import {push} from 'connected-react-router'

export default function redirect(target: string) {
  store.dispatch(push(target))
}