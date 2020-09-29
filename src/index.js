import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'antd/dist/antd.css'
import './i18n'
import {run, store, persistor} from './state'

const root = document.getElementById('root')

const content = <App store={store} persistor={persistor}/>

ReactDOM.render(content, root)
run()
serviceWorker.unregister()