import React from "react";

import Task from "../Task/Task";

import './TaskList.css';

export default function TaskList({todos, toCompleted, deleteItem}) {

  const listOfTasks = todos.map((todo) => {
    return (
      <li className={todo.done ? 'completed' : null} key={todo.id} >
        <Task
          description={todo.description}
          created={todo.created}
          done={todo.done}
          toggleComplete={() => toCompleted(todo.id)}
          onDeleted={() => deleteItem(todo.id)}
        />
      </li>
    );
  });


  return (
    <ul className="todo-list">
      { listOfTasks }
    </ul>
  );
}

