import React from 'react'
import { nanoid } from 'nanoid'
import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends React.Component {
  createItem

  constructor(props) {
    super(props)
    this.state = {
      todoData: [],
      filter: 'All',
    }

    this.createItem = (text, minute, sec) => {
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
  }

  stopTimer = (id) => {
    const { todoData } = this.state
    const { countdown } = todoData.find((el) => el.id === id)
    if (countdown) {
      const { timerId } = todoData.find((el) => el.id === id)
      this.setState(() => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].countdown = false
        return {
          todoData: data,
        }
      })
      clearInterval(timerId)
    }
  }

  startTimer = (id) => {
    const { todoData } = this.state
    const { countdown, remainingTime } = todoData.find((el) => el.id === id)
    if (!countdown) {
      const deadline = remainingTime + Date.now()
      const timerId = setInterval(() => {
        this.setState((pastState) => {
          const updateTodo = pastState.todoData.map((todoItem) => {
            if (todoItem.id === id) {
              if (todoItem.remainingTime < 1000) {
                this.stopTimer(id)
              }
              const newRemainingTime = deadline + 1000 - Date.now()
              return {
                ...todoItem,
                remainingTime: newRemainingTime,
              }
            }
            return todoItem
          })
          return {
            todoData: updateTodo,
          }
        })
      }, 1000)
      this.setState(() => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].timerId = timerId
        data[idx].countdown = true

        return {
          todoData: data,
        }
      })
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const { timerId } = todoData.find((el) => el.id === id)
      clearInterval(timerId)
      const NewTodoData = todoData.filter((el) => el.id !== id)
      return { todoData: NewTodoData }
    })
  }

  addItemToList = (text, minute, sec) => {
    const newItem = this.createItem(text, minute, sec)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return { todoData: newArr }
    })
  }

  toCompleted = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, done: !oldItem.done }
      return { todoData: todoData.with(index, newItem) }
    })
  }

  toEditing = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      if (!oldItem.done) {
        const newItem = { ...oldItem, editing: !oldItem.editing }
        return { todoData: todoData.with(index, newItem) }
      }
      return true
    })
  }

  onEditingSubmit = (id, text) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = { ...oldItem, description: text.trim(), editing: false }
      if (text.trim() !== '') {
        return { todoData: todoData.with(index, newItem) }
      }
      return true
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  deleteAllDone = () => {
    this.setState(({ todoData }) => {
      const undoneList = todoData.filter((todo) => !todo.done)
      return { todoData: undoneList }
    })
  }

  render() {
    const { todoData, filter } = this.state
    const countOfUndone = todoData.filter((todo) => !todo.done).length
    const filteredTasks = todoData.filter((todo) => {
      if (filter === 'All') return true
      if (filter === 'Active') return !todo.done
      if (filter === 'Completed') return todo.done
      return true
    })
    return (
      <section className="todoapp">
        <NewTaskForm addItemToList={this.addItemToList} />
        <section className="main">
          <TaskList
            todos={filteredTasks}
            toCompleted={this.toCompleted}
            deleteItem={this.deleteItem}
            toEditing={this.toEditing}
            onEditingSubmit={this.onEditingSubmit}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          <Footer
            count={countOfUndone}
            filterValue={filter}
            onFilterChange={this.onFilterChange}
            deleteAllDone={this.deleteAllDone}
          />
        </section>
      </section>
    )
  }
}

App.defaultProps = {
  todoData: [],
  filter: 'All',
}
