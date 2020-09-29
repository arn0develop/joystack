import State, {initialState} from 'src/dashboard/state/sidebar/state'
import {ActionType, AnyAction} from './actions'
import {RealmStatus} from '@joystack/protocol/realm/status'

function updateStatus(state: State, status: RealmStatus.AsObject): State {
  let updatedProjects = state.projects
  state.projects.forEach((project, index) => {
    if (project.realm.uniqueId === status.realmId) {
      updatedProjects = [...state.projects]
      updatedProjects[index] = {...project, status}
    }
  })
  const activeStatus = state.active.realmId == status.realmId ? status : state.active.status
  return {...state, projects: updatedProjects, active: {...state.active, status: activeStatus}}
}

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.WATCH_REALM_UPDATES_ERROR:
    return {...state, errors: {...state.errors, watchUpdates: action.cause}}
  case ActionType.FETCH_REALM_ERROR:
    return {
      ...state,
      errors: {...state.errors, fetchRealm: action.cause}
    }
  case ActionType.FETCH_PROJECT_LIST_ERROR:
    return {
      ...state,
      loaded: true,
      errors: {...state.errors, fetchProjects: action.cause}
    }
  case ActionType.FETCH_PROJECT_LIST_SUCCESS:
    return {...state, loaded: true, projects: action.projects}
  case ActionType.FETCH_REALM_SUCCESS:
    return {...state, active: {...state.active}}
  case ActionType.CHANGE_ACTIVE_REALM_SUCCESS:
    return {
      ...state,
      active: {...state.active, realmId: action.realmId, relativeId: action.relativeId}
    }
  case ActionType.WATCH_REALM_UPDATES_SUCCESS: {
    const updatedState = {
      ...state,
      errors: {...state.errors, watchUpdates: ''},
    }
    return updateStatus(updatedState, action.status)
  }
  case ActionType.FETCH_REALM_STATUS_REQUEST:
    return {...state, errors: {...state.errors, fetchStatus: undefined}}
  case ActionType.UPDATE_REALM_STATUS_ERROR:
    return {...state, errors: {...state.errors, fetchStatus: action.cause}}
  case ActionType.FETCH_REALM_STATUS_SUCCESS:
    return updateStatus(state, action.status)
  case ActionType.TOGGLE_SIDEBAR:
    return {...state, isOpen: !state.isOpen}
  default:
    return state
  }
}