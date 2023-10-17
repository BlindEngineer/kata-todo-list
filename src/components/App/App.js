import React from 'react'
import { nanoid } from 'nanoid'
import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    todoData: [this.createItem('Completed task'), this.createItem('Editing task'), this.createItem('Active task')],
    filter: 'All',
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const NewTodoData = todoData.filter((el) => el.id !== id)
      return { todoData: NewTodoData }
    })
  }

  addItemToList = (text) => {
    const newItem = this.createItem(text)
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

  // Доступно редактирование только незавершенных задач:
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
      // проверить позже
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

  // eslint-disable-next-line class-methods-use-this
  createItem(text) {
    return {
      description: text.trim(),
      created: Date.now(),
      id: nanoid(),
      done: false,
      editing: false,
    }
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
          />
          <Footer
            count={countOfUndone}
            filterValue={filter}
            onFilterChange={this.onFilterChange}
            deleteAllDone={this.deleteAllDone}
          >
            {/*  тест children */}
            {/* <h4 style={{color:'red'}}>COLOR</h4>vcvccvvcv */}
          </Footer>
        </section>
      </section>
    )
  }
}

App.defaultProps = {
  todoData: [],
  filter: 'All',
}
