import React from 'react';
import './App.css';
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

export default class App extends React.Component {

  state = {
    todoData: [
      {status: "completed", description: 'Completed task', created: 'created 17 seconds ago', id: 1},
      {status: "editing", description: 'Editing task', created: 'created 5 minutes ago', id: 2},
      {status: null, description: 'Active task', created: 'created 5 minutes ago', id: 3}
    ]
  }



  toCompleted = (id) => {
    this.setState(({todoData}) => {
      let index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = {...oldItem, status: oldItem.status === "completed" ? null : "completed"};
      return {todoData: todoData.with(index, newItem)};
    });
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      return ({todoData: todoData.filter((el) => el.id !== id)});
    });
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm/>
        <section className="main">
          <TaskList todos={this.state.todoData}
                    toCompleted={this.toCompleted}
                    deleteItem={this.deleteItem}
          />
          <Footer todos={this.state.todoData}/>
        </section>
      </section>
    );
  }
}
//
// function App() {
//
//   const todoData = [
//     {status: "completed", description: 'Completed task',  created: 'created 17 seconds ago', id: 1},
//     {status: "editing", description: 'Editing task', created: 'created 5 minutes ago', id: 2},
//     {status: null, description: 'Active task', created: 'created 5 minutes ago', id: 3}
//   ];
//
//   return (
//     <section className="todoapp">
//       <NewTaskForm/>
//       <section className="main">
//         <TaskList todos={todoData} />
//         <Footer todos={todoData}/>
//       </section>
//     </section>
//   );
// }
//
// export default App;
