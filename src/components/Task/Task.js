import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'
import Timer from '../Timer/Timer'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    const { description } = this.props
    this.state = {
      editingValue: description,
    }
    this.formatMinutes = (remainingTime) => {
      const minutes = Math.floor(remainingTime / 60000)
      return minutes < 10 ? `0${minutes}` : minutes
    }
    this.formatSeconds = (remainingTime) => {
      const seconds = Math.floor((remainingTime % 60000) / 1000)
      return seconds < 10 ? `0${seconds}` : seconds
    }
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
    const { description, remainingTime, created, toggleComplete, done, onDeleted, toEditing } = this.props
    const { editingValue } = this.state

    const minutes = this.formatMinutes(remainingTime)
    const seconds = this.formatSeconds(remainingTime)
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
          <label htmlFor="description">
            <span
              role="button"
              tabIndex={0}
              className={descriptionClassNames}
              onClick={toggleComplete}
              onKeyDown={(event) => (event.key === 'Enter' ? toggleComplete() : null)}
            >
              {description}
            </span>
            <Timer minutes={minutes} seconds={seconds} />
            <span className="created">Created {timeInWords} ago</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={toEditing} aria-label="log out" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="log out" />
        </div>
        <input
          type="text"
          className="edit"
          value={editingValue}
          onKeyDown={(event) => (event.key === 'Enter' ? this.onSubmit(event) : null)}
          onChange={this.onEditingLabel}
        />
      </>
    )
  }
}

Task.defaultProps = {
  description: 'Задача без названия',
  toEditing: () => {},
  onEditingSubmit: () => {},
  done: false,
  created: Date.now(),
}

Task.propTypes = {
  description: PropTypes.string,
  toggleComplete: PropTypes.func.isRequired,
  done: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
  toEditing: PropTypes.func,
  onEditingSubmit: PropTypes.func,
  created: PropTypes.number,
}
