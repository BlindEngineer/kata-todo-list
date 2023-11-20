import { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default function NewTaskForm({ addItemToList }) {
  const [label, setLabel] = useState('')
  const [minute, setMinute] = useState('')
  const [sec, setSec] = useState('')

  const onChangeLabel = (evt) => {
    setLabel(evt.target.value)
  }

  const onChangeMinutes = (evt) => {
    setMinute(Math.abs(evt.target.value))
  }

  const onChangeSeconds = (evt) => {
    setSec(Math.abs(evt.target.value))
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    if (label.trim() !== '') {
      addItemToList(label, minute, sec)
      setLabel('')
      setMinute('')
      setSec('')
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form action="#" className="todo-form">
        <input
          type="text"
          className="new-todo new-todo__text"
          placeholder="What needs to be done?"
          value={label}
          onChange={onChangeLabel}
          onKeyDown={(event) => (event.key === 'Enter' ? onSubmit(event) : null)}
        />
        <input
          type="number"
          className="new-todo new-todo__num"
          placeholder="Min"
          min={0}
          value={minute}
          onChange={onChangeMinutes}
          onKeyDown={(event) => (event.key === 'Enter' ? onSubmit(event) : null)}
        />
        <input
          type="number"
          className="new-todo new-todo__num"
          placeholder="Sec"
          min={0}
          max="59"
          value={sec}
          onChange={onChangeSeconds}
          onKeyDown={(event) => (event.key === 'Enter' ? onSubmit(event) : null)}
        />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  addItemToList: () => {},
}

NewTaskForm.propTypes = {
  addItemToList: PropTypes.func,
}
