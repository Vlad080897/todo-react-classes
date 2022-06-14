import React from "react";
import '../index.css'

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.task.description,
      isBlur: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.inputRef = React.createRef();
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value })
  }
  handleSubmit(e, id) {
    e.preventDefault();
    if (this.state.value.length && this.state.value.trim().length) {
      this.setState({ isBlur: false });
      this.props.updateValue(id, this.state.value);
    }
  }

  handleBlur(id, value) {
    return this.state.isBlur ? this.props.updateValue(id, value) : null
  }

  handleDoubleClick(id, input) {
    this.setState({ isBlur: true });
    this.props.toggleEditMode(id, input);
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
              this.handleDoubleClick(id, this.inputRef)
            }}
          >
            {description}
          </label>
          <button type="button" className="destroy" onClick={() => this.props.deleteTask(id)}></button>
        </div>
        <form action="" onSubmit={(e) => this.handleSubmit(e, id)}>
          <input
            type="text"
            className="edit"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={() => this.handleBlur(id, this.state.value)}
            ref={this.inputRef}
          />
        </form>
      </li >
    )
  }
}

export default Task