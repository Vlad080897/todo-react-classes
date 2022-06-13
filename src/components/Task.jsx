import React from "react";
import '../index.css'
import Emitter from "./Emitter";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.task.description
    };
    this.handleChange = this.handleChange.bind(this);
    
    this.inputRef = React.createRef();
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  handleDelete(id) {
    Emitter.emit('DELETE_TASK', id);
  };

  handleComplete(id) {
    Emitter.emit('COMPLETE_TASK', id);
  };

  handleToggle(id, inputRef) {
    Emitter.emit('TOGGLE_EDIT_MODE', { id, inputRef })
  }

  handleUpdateValue(id, value) {
    Emitter.emit('UPDATE_VALUE', { id, value })
  }

  

  render() {
    const { description, id, completed, isEdit } = this.props.task
    return (
      <li className={`${isEdit ? 'editing' : ''}`}>
        <div className="view">
          <input
            readOnly
            checked={`${completed ? `checked` : ''}`}
            type="checkbox"
            className="toggle"
            onClick={() => this.handleComplete(id)}
          />
          <label
            className={`description ${completed ? 'completed' : ''}`}
            onDoubleClick={() => this.handleToggle(id, this.inputRef)}
          >
            {description}
          </label>
          <button type="button" className="destroy" onClick={() => this.handleDelete(id)}></button>
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={() => this.handleUpdateValue(id, this.state.value)}
          ref={this.inputRef}
        />
      </li >
    )
  }
}

export default Task