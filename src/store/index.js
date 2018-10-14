import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/reducer.root'

const middleware = [thunk]
const devToolsExtension = window.devToolsExtension
const enhancers = []

if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const initialState = {}

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store
