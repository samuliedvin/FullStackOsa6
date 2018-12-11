import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import anecdeoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'


const reducer = combineReducers({
    anecdotes: anecdeoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer)

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)