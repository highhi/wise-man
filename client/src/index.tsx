import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import getStore from './store'
import App from './App'
import * as serviceWorker from './serviceWorker'
import firebase from './utils/firebase'
import { userLogin, userLogout } from './modules/user'

const store = getStore()

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(userLogin({ id: user.uid }))
  } else {
    store.dispatch(userLogout())
  }
})


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
