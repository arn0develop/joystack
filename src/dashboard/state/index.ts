import {all, fork} from 'redux-saga/effects'

import {
  updateActiveRealmIdOnSiteChange,
  updateActiveRealmOnProjectUpdate,
  updateRealmStatusSaga,
  realmUpdatesSaga,
  fetchProjectListSaga,
  changeActiveRealmSaga
} from './sidebar/saga'

import {watchForDisplayUpdates} from './display/saga'
import {updateSettingsSaga, fetchSettingsSaga} from './settings/saga'
import {executeCommandSaga, consoleMessageSaga} from './console/saga'
import {updatePluginListSaga, updateSinglePluginSaga, fetchPluginListSaga} from './plugins/saga'
import {combineReducers} from 'redux'
import sidebarReducer from './sidebar/reducer'
import settingsReducer from './settings/reducer'
import displayReducer from './display/reducer'
import consoleReducer from './console/reducer'
import pluginsReducer from './plugins/reducer'
import popupReducer from './popup/reducer'
import {fetchRealmStatusSaga} from './sidebar/saga/fetch'

export * from './state'

export function* saga() {
  yield all([
    fork(realmUpdatesSaga),
    fork(changeActiveRealmSaga),
    fork(fetchProjectListSaga),
    fork(updateSettingsSaga),
    fork(watchForDisplayUpdates),
    fork(fetchSettingsSaga),
    fork(updateActiveRealmIdOnSiteChange),
    fork(updateActiveRealmOnProjectUpdate),
    fork(updateRealmStatusSaga),
    fork(executeCommandSaga),
    fork(consoleMessageSaga),
    fork(updateSinglePluginSaga),
    fork(updatePluginListSaga),
    fork(fetchPluginListSaga),
    fork(fetchRealmStatusSaga)
  ])
}

export const reduce = combineReducers({
  sidebar: sidebarReducer,
  settings: settingsReducer,
  display: displayReducer,
  console: consoleReducer,
  plugins: pluginsReducer,
  popup: popupReducer
})