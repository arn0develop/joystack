import * as Redux from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import 'regenerator-runtime/runtime'
import history from 'src/history'
import * as account from 'src/login/state'
import * as realm from 'src/setup/state'
import * as translations from 'src/translations/state'
import * as dashboard from 'src/dashboard/state'
import {all, fork} from 'redux-saga/effects'

const persistConfig = {
  key: 'primary',
  whitelist: ['account', 'translations', 'realm'],
  storage
}
const sagaMiddleware = createSagaMiddleware()

function combineReducers(): Redux.Reducer {
  return Redux.combineReducers({
    account: account.reduce,
    realm: realm.reduce,
    translations: translations.reduce,
    dashboard: dashboard.reduce,
    router: connectRouter(history)
  })
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers()),
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    routerMiddleware(history),
    sagaMiddleware
  ]
})

export const persistor = persistStore(store)

export default { store, persistor }

export const initialState = {
  account: account.initialState,
  realm: realm.initialState,
  translations: translations.initialState,
  dashboard: dashboard.initialState
}

export interface CombinedState {
  account: account.State
  realm: realm.State
  translations: translations.State
  dashboard: dashboard.State
}

function* rootSaga() {
  yield all([
    fork(dashboard.saga),
    fork(realm.saga)
  ])
}

export function run() {
  sagaMiddleware.run(rootSaga)
}