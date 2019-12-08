import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { getRequest, postRequest } from '../utils/httpClient'
import { rootEpic } from '../modules/middleware'
import { rootReducer } from '../modules'

const epicMiddleware = createEpicMiddleware({
  dependencies: { getRequest, postRequest }
})
const middleware: any = [epicMiddleware]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({
    diff: true,
    collapsed: true,
  }))
}

export default function getStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
  )
  
  epicMiddleware.run(rootEpic)
  return store
}
