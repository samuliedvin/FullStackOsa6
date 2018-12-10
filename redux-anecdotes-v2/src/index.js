import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
// import store from './store'
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
        <App store={store} />,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)