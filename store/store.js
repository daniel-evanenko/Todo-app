
const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    carModule: carReducer,
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
