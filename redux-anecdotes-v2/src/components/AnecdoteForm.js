import React from 'react'
import { addAnecdote } from './../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        this.props.addAnecdote(newAnecdote)
    }
    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote'/></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

export default connect(
    null,
    { addAnecdote }
)(AnecdoteForm)