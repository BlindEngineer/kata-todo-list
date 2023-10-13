import React from "react";
import './Task.css';

export default class Task extends React.Component {

  render() {
    const {id, description, created, toggleComplete, done, onDeleted} = this.props;

    let classNames = 'description';
    if(done) {
      classNames += ' done';
    } else {
      classNames = 'description'
    }

    return (
      <div className="view">
        <input type="checkbox"
               checked={done}
               // defaultChecked={done === true}
               className="toggle"
               onChange={() => toggleComplete(id)}/>
        <label>
          <span className={classNames}
                onClick={ toggleComplete }
          >{description}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"
                onClick={() => onDeleted(id)}></button>
      </div>
    )
  }
}