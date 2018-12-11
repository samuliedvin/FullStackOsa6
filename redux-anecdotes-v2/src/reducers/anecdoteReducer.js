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

export const anecdoteInitialization = (data) => {
    return {
        type: 'INIT_ANECDOTES',
        data
    }
}

export const addAnecdote = (data) => {
    return {
        type: 'CREATE',
        data
    }
}

export const voteAnecdote = (id) => {
    return {
        type: 'VOTE',
        id: id
    }
}

export default anecdoteReducer