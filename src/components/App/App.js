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
    const newTodoData = [...this.state.todoData];
    if (newTodoData[index].status === "completed") {
      newTodoData[index].status = null;
    } else {
      newTodoData[index].status = "completed";
    }
    return {todoData: newTodoData};
  });
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      let delIndex = todoData.findIndex((el) => el.id === id);

      const newArray = todoData.filter((todo, index) => {
        return delIndex !== index;
      });
      console.log(newArray);
      return {todoData: newArray}
    });
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm/>
        <section className="main">
          <TaskList todos={ this.state.todoData }
                    toCompleted={ this.toCompleted }
                    deleteItem={ this.deleteItem }
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
