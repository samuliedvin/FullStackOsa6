import React from 'react'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'


class AnecdoteList extends React.Component {

    render() {
        let { visibleAnecdotes } = this.props

        return (
            <div>
                <h2>Anecdotes</h2>
                {visibleAnecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                        has {anecdote.votes}
                            <button onClick={async () => {
                                this.props.setNotification('you voted \'' + anecdote.content + '\'')
                                // Add anecdote votes to backend.
                                await anecdoteService.update(anecdote.id, {
                                    ...anecdote,
                                    votes: anecdote.votes + 1
                                })
                                this.props.voteAnecdote(anecdote.id)
                                setTimeout(() => {
                                    this.props.setNotification('')
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

const anecdotesToShow = (anecdotes, filter) => {
    return anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
        .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter),
        filter: state.filter
    }
}

const connectedAnecdoteList = connect(
    mapStateToProps,
    {
        voteAnecdote,
        setNotification
    }
)(AnecdoteList)

export default connectedAnecdoteList
