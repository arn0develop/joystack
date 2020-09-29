import React from 'react'
import * as Redux from 'redux'
import {Provider} from 'react-redux'
import {Persistor} from 'redux-persist/es/types'
import {PersistGate} from 'redux-persist/integration/react'
import {I18nextProvider} from 'react-i18next'
import {ConnectedRouter} from 'connected-react-router'
import {CombinedState} from 'src/state'
import Routes from 'src/Routes'
import history from 'src/history'
import i18n from 'src/i18n'
import Loading from './component/Loading'

interface Properties {
  store: Redux.Store<CombinedState>
  persistor: Persistor
}

class App extends React.Component<Properties> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <React.Suspense fallback={<Loading/>}>
            <I18nextProvider i18n={i18n}>
              <PersistGate loading={null} persistor={this.props.persistor}>
                <Routes/>
              </PersistGate>
            </I18nextProvider>
          </React.Suspense>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
