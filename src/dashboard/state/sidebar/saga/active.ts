import {CombinedState} from 'src/state'
import {LOCATION_CHANGE, LocationChangeAction} from 'connected-react-router'
import {put, select, takeEvery} from 'redux-saga/effects'
import State, {findProjectByRelativeId, Project} from '../state'
import {
  ActionType,
  ChangeActiveRealmRequestAction,
  FetchProjectListSuccessAction
} from '../actions'
import {errors} from 'src/errors'

function selectSidebarState(state: CombinedState): State  {
  return state.dashboard.sidebar
}

function resolveUniqueId(relativeId: number, projects: Project[]): number | undefined {
  return findProjectByRelativeId(relativeId, projects)?.realm.uniqueId
}

const ACTIVE_REALM_PATTERN = /^\/dashboard\/(?<realm>\d+)\/.*/

function* fireRealmUpdate(locationChange: LocationChangeAction) {
  const location = locationChange.payload.location.pathname
  const matched = ACTIVE_REALM_PATTERN.exec(location)
  const realmId = Number(matched?.groups?.realm)
  if (!isNaN(realmId)) {
    const loaded = (yield select(selectSidebarState)) as State
    if (loaded.active.relativeId === realmId) {
      return
    }
    yield put({type: ActionType.CHANGE_ACTIVE_REALM_REQUEST, relativeId: realmId})
  }
}

export function *updateActiveRealmIdOnSiteChange() {
  yield takeEvery(LOCATION_CHANGE, fireRealmUpdate)
}


function* synchronizeRelativeId() {
  const loaded = (yield select(selectSidebarState)) as State
  yield put({type: ActionType.CHANGE_ACTIVE_REALM_REQUEST, relativeId: loaded.active.relativeId})
}

export function* updateActiveRealmOnProjectUpdate() {
  yield takeEvery<FetchProjectListSuccessAction>(
    ActionType.FETCH_PROJECT_LIST_SUCCESS,
    synchronizeRelativeId
  )
}

function *changeActiveRealm({relativeId}: {relativeId: number}) {
  const state = (yield select(selectSidebarState)) as State
  const realmId = resolveUniqueId(relativeId, state.projects)
  if (realmId) {
    yield put({type: ActionType.CHANGE_ACTIVE_REALM_SUCCESS, relativeId, realmId})
  } else {
    yield put({type: ActionType.CHANGE_ACTIVE_REALM_ERROR, relativeId, cause: errors.realm.notFound})
  }
}

export function *changeActiveRealmSaga() {
  yield takeEvery<ChangeActiveRealmRequestAction>(
    ActionType.CHANGE_ACTIVE_REALM_REQUEST,
    changeActiveRealm
  )
}