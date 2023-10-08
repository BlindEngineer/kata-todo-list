import React from "react";
import './Task.css';

export default class Task extends React.Component {

  render() {

    const {id, description, created, toggleComplete, status, onDeleted} = this.props;

    return (
      <div className="view">
        <input type="checkbox"
               checked={status === "completed"}
               className="toggle"
               onClick={() => toggleComplete(id)}/>
        <label>
          <span className="description">{description}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"
        onClick={() => onDeleted(id)}></button>
      </div>
    )
  }
}