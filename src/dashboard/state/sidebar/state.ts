import {Realm} from '@joystack/protocol/realm'
import {RealmStatus} from '@joystack/protocol/realm/status'

export interface OpenTab {
  relativeId: number
  realmId?: number
  status?: RealmStatus.AsObject
}

export interface Project {
  key: string
  name: string
  icon: string
  owner: string
  status: RealmStatus.AsObject
  description: string
  realm: {
    relativeId: number
    uniqueId: number
  }
}

export default interface State {
  active: OpenTab
  loaded: boolean
  projects: Project[]
  errors: {
    fetchProjects?: string
    fetchRealm?: string
    fetchStatus?: string
    watchUpdates?: string
    update?: string
  }
  isOpen: boolean
}

export const initialState: State = {
  active: {
    realmId: undefined,
    status: undefined,
    relativeId: 0,
  },
  loaded: false,
  projects: [],
  errors: {},
  isOpen: false
}

export function findProjectByRelativeId(relativeId: number, projects: Project[]): Project | null {
  return projects.length <= relativeId ? null : projects[relativeId]
}