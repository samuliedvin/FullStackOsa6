import React from 'react'
import { filterChange } from './../reducers/filterReducer'
import { connect } from 'react-redux'


class Filter extends React.Component {
    handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        let filter = event.target.value
        this.props.filterChange(filter)
    }

    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
            filter <input onChange={this.handleChange}/>
            </div>
        )
    }
}

export default connect(
    null,
    { filterChange }
)(Filter)