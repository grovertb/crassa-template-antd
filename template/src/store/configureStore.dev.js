import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createReduxWaitForMiddleware from 'redux-wait-for-action'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from 'reducers'
import rootSaga from 'sagas'
import DevTools from 'containers/Root/DevTools'

export const history = createBrowserHistory()

const initialState = {}
const sagaMiddleware = createSagaMiddleware()
const middleware = [ sagaMiddleware, routerMiddleware(history), createLogger() ]

const finalCreateStore = compose(
  applyMiddleware(...middleware), 
  applyMiddleware(createReduxWaitForMiddleware()),
  DevTools.instrument()
  )

const store = createStore(createRootReducer(history), initialState, finalCreateStore)

sagaMiddleware.run(rootSaga)

export default store
