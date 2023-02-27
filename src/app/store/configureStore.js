import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer'
import rootSaga from '../sagas/rootSaga'

export default function configureStore(preloadedState) {
  const saga = createSagaMiddleware()
  const middlewares = [saga]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const storeEnhancers = [middlewareEnhancer]
  const composedEnhancer = composeWithDevTools(...storeEnhancers)

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancer
  )

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('app/reducers/rootReducer', () => {
        const newRootReducer = require('app/reducers/rootReducer').default
        store.replaceReducer(newRootReducer)
      })
    }
  }
  return {...store, runSaga: saga.run(rootSaga)}
}
