import {ActionType, AnyAction} from './actions'
import {Resource} from '@joystack/protocol/realm/resource'
import State, {initialState} from './state'

function removeFromSet(
  elements: Resource.AsObject[],
  element: Resource.AsObject
): Resource.AsObject[] {
  return elements.filter(entry => entry.id !== element.id)
}

function addToSet(
  elements: Resource.AsObject[],
  element: Resource.AsObject
): Resource.AsObject[] {
  const exists = elements.some(entry => entry.id === element.id)
  return exists ? elements : [...elements, element]
}

export default function reduce(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
  case ActionType.RESET:
    return initialState
  case ActionType.UPDATE_ICON:
    return {...state, icon: action.icon}
  case ActionType.UPDATE_REALM_DESCRIPTION_SUCCESS:
    return {
      ...state,
      realmDescription: {
        ...state.realmDescription,
        ...action.description,
        conflicts: {isDomainTaken: false, isNameTaken: false},
        error: ''
      }
    }
  case ActionType.UPDATE_REALM_DESCRIPTION_ERROR:
    return {
      ...state,
      realmDescription: {
        ...state.realmDescription,
        error: action.cause,
        conflicts: action.conflicts
      }
    }
  case ActionType.UPDATE_TYPE:
    return {...state, type: action.realmType }
  case ActionType.ADD_RESOURCE:
    return {...state, resources: addToSet(state.resources, action.resource)}
  case ActionType.REMOVE_RESOURCE:
    return {...state, resources: removeFromSet(state.resources, action.resource)}
  default:
    return state
  }
}
