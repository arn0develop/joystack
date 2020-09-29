import domainReducer from './domain/reducer'
import iconReducer from './icon/reducer'
import resourceReducer from './resource/reducer'
import typeReducer from './type/reducer'
import wizardReducer from './wizard/reducer'
import popupReducer from '../../dashboard/state/popup/reducer'

import { combineReducers } from 'redux'

import { fetchDomainNamesSaga } from './domain/saga'
import { fetchIconsSaga } from './icon/saga'
import { fetchResourcesSaga } from './resource/saga'
import { fetchTypesSaga } from './type/saga'
import { updateDescriptionSaga } from './wizard/saga'

import { all, fork } from 'redux-saga/effects'

export * from './state'

export function* saga() {
  yield all([
    fork(fetchDomainNamesSaga),
    fork(fetchIconsSaga),
    fork(fetchResourcesSaga),
    fork(fetchTypesSaga),
    fork(updateDescriptionSaga)
  ])
}

export const reduce = combineReducers({
  domain: domainReducer,
  icon: iconReducer,
  resource: resourceReducer,
  type: typeReducer,
  wizard: wizardReducer,
  popup: popupReducer
})