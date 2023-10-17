import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    editingValue: this.props.description,
  }

  onEditingLabel = (evt) => {
    this.setState({ editingValue: evt.target.value })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    const { onEditingSubmit } = this.props
    const { editingValue } = this.state
    onEditingSubmit(editingValue)
  }

  render() {
    const { description, created, toggleComplete, done, onDeleted, toEditing } = this.props
    const { editingValue } = this.state

    let descriptionClassNames = 'description'
    if (done) {
      descriptionClassNames += ' done'
    } else {
      descriptionClassNames = 'description'
    }

    const timeInWords = formatDistanceToNow(created, { includeSeconds: true })

    return (
      <>
        <div className="view">
          <input type="checkbox" checked={done} className="toggle" onChange={toggleComplete} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span className={descriptionClassNames} onClick={toggleComplete}>
              {description}
            </span>
            <span className="created">Created {timeInWords} ago</span>
          </label>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="icon icon-edit" onClick={toEditing} />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={editingValue} onChange={this.onEditingLabel} />
        </form>
      </>
    )
  }
}

Task.defaultProps = {
  description: 'Задача без названия',
  toggleComplete: () => {},
  toEditing: () => {},
  onEditingSubmit: () => {},
  done: false,
  onDeleted: () => {},
  created: Date.now(),
}

Task.propTypes = {
  description: PropTypes.string,
  toggleComplete: PropTypes.func,
  done: PropTypes.bool,
  onDeleted: PropTypes.func,
  toEditing: PropTypes.func,
  onEditingSubmit: PropTypes.func,
  created: PropTypes.number,
}
