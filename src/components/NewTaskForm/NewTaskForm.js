import React from "react";
import PropTypes from "prop-types";

import './NewTaskForm.css';


export default class NewTaskForm extends React.Component {

  state = {
    label: ''
  }

  onChangeLabel = (evt) => {
    this.setState({label: evt.target.value})
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.label.trim() !== ''){
    this.props.addItemToList(this.state.label);
    this.setState({label: ''});}
  }


  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form action="#" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.label}
            onChange={this.onChangeLabel}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  addItemToList: () => {}
}

NewTaskForm.propTypes = {
  addItemToList: PropTypes.func
}
