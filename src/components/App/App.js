import React from 'react';
import {nanoid} from 'nanoid';

import './App.css';

import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

export default class App extends React.Component {

  state = {
    todoData: [
      this.createItem('Completed task'),
      this.createItem('Editing task'),
      this.createItem('Active task')
    ],
    filter: 'All'
  };

  createItem(text) {
    return {
      description: text,
      created: Date.now(),
      id: nanoid(),
      done: false
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const NewTodoData = todoData.filter((el) => el.id !== id);
      return ({todoData: NewTodoData});
    });
  }

  addItemToList = (text) => {
    const newItem = this.createItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {todoData: newArr};
    });
  }

  toCompleted = (id) => {
    this.setState(({todoData}) => {
      let index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = {...oldItem, done: !oldItem.done};
      return {todoData: todoData.with(index, newItem)};
    });
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  }

  deleteAllDone = () => {
    this.setState(({todoData}) => {
      const undoneList = todoData.filter(todo => !todo.done);
      return {todoData: undoneList};
    });
  }

  render() {
    const {todoData, filter} = this.state;
    const countOfUndone = todoData.filter((todo) => !todo.done).length;

    const filteredTasks = todoData.filter( todo => {
        if (filter === 'All') return true;
        if (filter === 'Active') return !todo.done;
        if (filter === 'Completed') return todo.done;
        return true;
      }
    );

    return (
      <section className="todoapp">
        <NewTaskForm addItemToList={this.addItemToList}/>
        <section className="main">
          <TaskList todos={ filteredTasks }
                    toCompleted={this.toCompleted}
                    deleteItem={this.deleteItem}
          />
          <Footer count={countOfUndone}
                  filterValue={this.state.filter}
                  onFilterChange={this.onFilterChange}
                  deleteAllDone={this.deleteAllDone}/>
        </section>
      </section>
    );
  }
}

