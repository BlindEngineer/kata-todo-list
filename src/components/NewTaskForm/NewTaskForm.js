import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      minute: null,
      sec: null,
    }
  }

  onChangeLabel = (evt) => {
    this.setState({ label: evt.target.value })
  }

  onChangeMinutes = (evt) => {
    this.setState({ minute: evt.target.value })
  }

  onChangeSeconds = (evt) => {
    this.setState({ sec: evt.target.value })
  }

  onSubmit = (evt) => {
    const { label, minute, sec } = this.state
    const { addItemToList } = this.props
    evt.preventDefault()
    if (label.trim() !== '') {
      addItemToList(label, minute, sec)
      this.setState({ minute: '', label: '', sec: '' })
    }
  }

  render() {
    const { label, minute, sec } = this.state
    return (
      <header className="header">
        <h1>Todos</h1>
        <form action="#" className="todo-form">
          <input
            type="text"
            className="new-todo new-todo__text"
            placeholder="What needs to be done?"
            value={label}
            onChange={this.onChangeLabel}
            onKeyDown={(event) => (event.key === 'Enter' ? this.onSubmit(event) : null)}
          />
          <input
            type="number"
            className="new-todo new-todo__num"
            placeholder="Min"
            value={minute}
            onChange={this.onChangeMinutes}
            onKeyDown={(event) => (event.key === 'Enter' ? this.onSubmit(event) : null)}
          />
          <input
            type="number"
            className="new-todo new-todo__num"
            placeholder="Sec"
            value={sec}
            onChange={this.onChangeSeconds}
            onKeyDown={(event) => (event.key === 'Enter' ? this.onSubmit(event) : null)}
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
