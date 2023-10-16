import React from "react";
import PropTypes from "prop-types";
import {formatDistanceToNow} from 'date-fns'

import './Task.css';

export default class Task extends React.Component {

  state = {
    editingValue: this.props.description
  }

  onEditingLabel = (evt) => {
    this.setState({editingValue: evt.target.value})
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onEditingSubmit(this.state.editingValue);
  }

  render() {
    const {
      description,
      created,
      toggleComplete,
      done,
      onDeleted,
      toEditing
    } = this.props;

    let descriptionClassNames = 'description';
    if (done) {
      descriptionClassNames += ' done';
    } else {
      descriptionClassNames = 'description'
    }

    const timeInWords = formatDistanceToNow(created, {includeSeconds: true});


    return (
      <>
        <div className="view">
          <input type="checkbox"
                 checked={done}
                 className="toggle"
                 onChange={toggleComplete}/>
          <label>
          <span className={descriptionClassNames}
                onClick={toggleComplete}
          >{description}</span>
            <span className="created">Created {timeInWords} ago</span>
          </label>
          <button className="icon icon-edit"
                  onClick={toEditing}></button>
          <button className="icon icon-destroy"
                  onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type='text' className="edit" value={this.state.editingValue} onChange={this.onEditingLabel}/>
        </form>
      </>
    )
  }
}

Task.defaultProps = {
  description: 'Задача без названия',
  toggleComplete: () => {
  },
  toEditing: () => {
  },
  onEditingSubmit: () => {
  },
  done: false,
  onDeleted: () => {
  },
  created: Date.now(),
  editing: false
}

Task.propTypes = {
  description: PropTypes.string,
  toggleComplete: PropTypes.func,
  done: PropTypes.bool,
  onDeleted: PropTypes.func,
  toEditing: PropTypes.func,
  onEditingSubmit: PropTypes.func,
  created: PropTypes.number,
  editing: PropTypes.bool
}