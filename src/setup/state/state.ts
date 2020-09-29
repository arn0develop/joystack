import DomainState, { initialState as initialDomainState } from './domain/state'
import IconState, { initialState as initialIconState } from './icon/state'
import ResourceState, { initialState as initialResourceState } from './resource/state'
import TypeState, { initialState as initialTypeState } from './type/state'
import WizardState, { initialState as initialWizardState } from './wizard/state'
import PopupState, {initialState as initialPopupState} from '../../dashboard/state/popup/state'

export interface State {
  domain: DomainState
  icon: IconState
  resource: ResourceState
  type: TypeState
  wizard: WizardState
  // popup: PopupState
}

export const initialState: State = {
  type: initialTypeState,
  icon: initialIconState,
  resource: initialResourceState,
  wizard: initialWizardState,
  domain: initialDomainState,
  // popup: initialPopupState
}