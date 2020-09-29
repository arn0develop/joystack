import {Resource} from '@joystack/protocol/realm/resource'
import {RealmType} from '@joystack/protocol/realm/type'
import {RealmIcon} from '@joystack/protocol/realm/icon'
import {DomainName} from '@joystack/protocol/realm/domain'

export default interface State {
  type?: RealmType.AsObject
  icon?: RealmIcon.AsObject
  resources: Resource.AsObject[]
  realmDescription: RealmDescription
}

export interface RealmDescriptionConflicts {
  isNameTaken: boolean
  isDomainTaken: boolean
}

export interface RealmDescription {
  name: string
  subDomain: string
  domainName?: DomainName.AsObject
  text: string
  error: string
  conflicts: RealmDescriptionConflicts
}

export const initialState: State = {
  resources: [],
  realmDescription: {
    subDomain: '',
    name: '',
    text: '',
    error: '',
    conflicts: {
      isDomainTaken: false,
      isNameTaken: false
    }
  },
  icon: undefined,
  type: undefined
}

export function createFullDomainName(
  domainName: DomainName.AsObject | undefined,
  subDomain: string
): string | undefined {
  if (!domainName) {
    return undefined
  }
  return subDomain.length === 0
    ? undefined
    : `${subDomain}.${domainName.name}`
}