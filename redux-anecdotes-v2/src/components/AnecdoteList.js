import React from 'react'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
    anecdotesToShow = () => {
        
    }

    render() {
        let { anecdotes, filter } = this.props.store.getState()
        anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                        has {anecdote.votes}
                            <button onClick={() => {
                                this.props.store.dispatch(setNotification('you voted \'' + anecdote.content + '\''))
                                this.props.store.dispatch(voteAnecdote(anecdote.id))
                                setTimeout(() => {
                                    this.props.store.dispatch(setNotification(''))
                                }, 5000)
                            }
                            }>
                            vote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default AnecdoteList
