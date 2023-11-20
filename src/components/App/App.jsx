import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')

  const createItem = (text, minute, sec) => {
    return {
      description: text.trim(),
      created: Date.now(),
      id: nanoid(),
      done: false,
      editing: false,
      countdown: false,
      remainingTime: (minute * 60 + Number(sec)) * 1000,
      timerId: null,
    }
  }

  const stopTimer = (id) => {
    const { countdown } = todoData.find((el) => el.id === id)
    if (countdown) {
      const { timerId } = todoData.find((el) => el.id === id)
      setTodoData((prevState) => {
        const idx = prevState.findIndex((el) => el.id === id)
        const data = [...prevState]
        data[idx].countdown = false
        return data
      })
      clearInterval(timerId)
    }
  }

  const startTimer = (id) => {
    const { countdown, remainingTime } = todoData.find((el) => el.id === id)
    if (!countdown) {
      const deadline = remainingTime + Date.now()
      const timerId = setInterval(() => {
        setTodoData((prevState) => {
          return prevState.map((todoItem) => {
            if (todoItem.id === id) {
              let newRemainingTime = 0
              if (todoItem.remainingTime < 1000) {
                stopTimer(id)
              } else {
                newRemainingTime = deadline - Date.now()
              }
              return {
                ...todoItem,
                remainingTime: newRemainingTime,
              }
            }
            return todoItem
          })
        })
      }, 500)
      setTodoData(() => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].timerId = timerId
        data[idx].countdown = true
        return data
      })
    }
  }

  const deleteItem = (id) => {
    const { timerId } = todoData.find((el) => el.id === id)
    clearInterval(timerId)
    setTodoData(() => {
      return todoData.filter((el) => el.id !== id)
    })
  }

  const addItemToList = (text, minute, sec) => {
    const newItem = createItem(text, minute, sec)
    setTodoData([...todoData, newItem])
  }

  const toCompleted = (id) => {
    setTodoData(() => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, done: !oldItem.done }
      return todoData.with(index, newItem)
    })
  }

  const toEditing = (id) => {
    setTodoData(() => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      if (!oldItem.done) {
        const newItem = { ...oldItem, editing: !oldItem.editing }
        return todoData.with(index, newItem)
      }
      return true
    })
  }

  const onEditingSubmit = (id, text) => {
    setTodoData(() => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, description: text.trim(), editing: false }
      if (text.trim() !== '') {
        return todoData.with(index, newItem)
      }
      return true
    })
  }

  const onFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const deleteAllDone = () => {
    setTodoData(todoData.filter((todo) => !todo.done))
  }

  const countOfUndone = todoData.filter((todo) => !todo.done).length

  const filteredTasks = todoData.filter((todo) => {
    if (filter === 'All') return true
    if (filter === 'Active') return !todo.done
    if (filter === 'Completed') return todo.done
    return true
  })

  return (
    <section className="todoapp">
      <NewTaskForm addItemToList={addItemToList} />
      <section className="main">
        <TaskList
          todos={filteredTasks}
          toCompleted={toCompleted}
          deleteItem={deleteItem}
          toEditing={toEditing}
          onEditingSubmit={onEditingSubmit}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        <Footer
          count={countOfUndone}
          filterValue={filter}
          onFilterChange={onFilterChange}
          deleteAllDone={deleteAllDone}
        />
      </section>
    </section>
  )
}
