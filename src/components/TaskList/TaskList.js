import React from "react";

import Task from "../Task/Task";

import './TaskList.css';

export default function TaskList({todos, toCompleted, deleteItem}) {

  const listOfTasks = todos.map((todo) => {
    return (
      <li className={todo.status} key={todo.id}>
        <Task
          description={todo.description}
          created={todo.created}
          status={todo.status}
          toggleComplete={() => toCompleted(todo.id)}
          onDeleted={() => deleteItem(todo.id)}
        />
        {
          todo.status === "editing" &&
          <input type="text" className="edit" defaultValue="Editing task"/>
        }
      </li>
    );
  });

  return (
    <ul className="todo-list">
      { listOfTasks }
    </ul>
  );
}

