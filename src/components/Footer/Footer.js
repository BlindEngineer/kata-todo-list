import React from "react";

import './Footer.css';

import TaskFilter from "../TasksFilter/TaskFilter";

export default function Footer({onFilterChange, count, deleteAllDone, filterValue}) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter
        onFilterChange={onFilterChange}
        filterValue={filterValue}/>
      <button className="clear-completed" onClick={deleteAllDone}>Clear completed</button>
    </footer>
  )
}