import React from "react";
import '../index.css'

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.task.description
    }
    this.handleChange = this.handleChange.bind(this);
    this.inputRef = React.createRef()
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value })

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
            onClick={() => this.props.completeTask(id)}
          />
          <label
            className={`description ${completed ? 'completed' : ''}`}
            onDoubleClick={(e) => {
              this.props.toggleEditMode(id, this.inputRef);
            }}
          >
            {description}
          </label>
          <button type="button" className="destroy" onClick={() => this.props.deleteTask(id)}></button>
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={() => this.props.updateValue(id, this.state.value)}
          ref={this.inputRef}
        />
      </li >
    )
  }
}

export default Task