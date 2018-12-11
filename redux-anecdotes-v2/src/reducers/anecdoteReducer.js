import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)


const anecdoteReducer = (store = initialState, action) => {
    switch(action.type) {
    case 'VOTE':
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)
        return [...old, { ...voted, votes: voted.votes+1 } ]
    case 'CREATE':
        return [...store, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    }
    return store
}

export const anecdoteInitialization = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const addAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'CREATE',
            data: newAnecdote
        })
    }
}

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.update(anecdote.id, {
            ...anecdote,
            votes: anecdote.votes + 1
        })
        dispatch({
            type: 'VOTE',
            id: anecdote.id
        })
    }
}

export default anecdoteReducer