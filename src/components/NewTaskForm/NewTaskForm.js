import React from "react";

import './NewTaskForm.css';

export default function NewTaskForm() {
  return (
    <header className="header">
      <h1>Todos</h1>
      <input type="text" className="new-todo" placeholder="What needs to be done?" autoFocus/>
    </header>
  )
}