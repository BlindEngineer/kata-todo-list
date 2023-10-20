import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  onChangeLabel = (evt) => {
    this.setState({ label: evt.target.value })
  }

  onSubmit = (evt) => {
    const { label } = this.state
    const { addItemToList } = this.props
    evt.preventDefault()
    if (label.trim() !== '') {
      addItemToList(label)
      this.setState({ label: '' })
    }
  }

  render() {
    const { label } = this.state
    return (
      <header className="header">
        <h1>Todos</h1>
        <form action="#" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={label}
            onChange={this.onChangeLabel}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  addItemToList: () => {},
}

NewTaskForm.propTypes = {
  addItemToList: PropTypes.func,
}
