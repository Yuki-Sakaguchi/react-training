import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App';
import reducer from './reducers';
const store = createStore(reducer) // アプリケーション内のstate(状態)を保存しているところ

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)