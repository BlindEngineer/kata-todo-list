import { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default function Task({
  description,
  onEditingSubmit,
  remainingTime,
  created,
  toggleComplete,
  done,
  onDeleted,
  toEditing,
  startTimer,
  stopTimer,
}) {
  const [editingValue, setEditingValue] = useState(description)

  const formatMinutes = (time) => {
    const minutes = Math.floor(time / 60000)
    return minutes < 10 ? `0${minutes}` : minutes
  }
  const formatSeconds = (time) => {
    const seconds = Math.floor((time % 60000) / 1000)
    return seconds < 10 ? `0${seconds}` : seconds
  }
  const onEditingLabel = (evt) => {
    setEditingValue(evt.target.value)
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    onEditingSubmit(editingValue)
  }

  const minutes = formatMinutes(remainingTime)
  const seconds = formatSeconds(remainingTime)
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
          <span className="description timer">
            <button type="button" className="icon icon-play" aria-label="Play" onClick={startTimer} />
            <button type="button" className="icon icon-pause" aria-label="Pause" onClick={stopTimer} />
            {minutes}:{seconds}
          </span>
          <span className="created">Created {timeInWords} ago</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={toEditing} aria-label="edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="destroy" />
      </div>
      <input
        type="text"
        className="edit"
        value={editingValue}
        onKeyDown={(event) => (event.key === 'Enter' ? onSubmit(event) : null)}
        onChange={onEditingLabel}
      />
    </>
  )
}

Task.defaultProps = {
  description: 'Задача без названия',
  toEditing: () => {},
  onEditingSubmit: () => {},
  done: false,
  created: Date.now(),
  startTimer: () => {},
  stopTimer: () => {},
  remainingTime: 0,
}

Task.propTypes = {
  description: PropTypes.string,
  toggleComplete: PropTypes.func.isRequired,
  done: PropTypes.bool,
  onDeleted: PropTypes.func.isRequired,
  toEditing: PropTypes.func,
  onEditingSubmit: PropTypes.func,
  created: PropTypes.number,
  remainingTime: PropTypes.number,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
}
