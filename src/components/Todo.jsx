import React from "react";
import Task from "./Task";

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.checkAllBtn = React.createRef();
    this.isAllChecked = this.isAllChecked.bind(this);
  }

  isAllChecked() {
    const haveNotCompleted = this.props.tasks.find(t => t.completed === false);
    if (haveNotCompleted) {
      this.checkAllBtn.current.checked = false;
    }
    if (!haveNotCompleted && this.props.tasks.length) {
      const fromLocal = (JSON.parse(localStorage.getItem('tasks') || [])).find(t => t.completed === false);
      if (fromLocal) {
        this.checkAllBtn.current.checked = false;
        return;
      };
      this.checkAllBtn.current.checked = true;
      return;
    };
    this.checkAllBtn.current.checked = false;
  }

  componentDidMount() {
    this.isAllChecked();
  }
  componentDidUpdate() {
    this.isAllChecked();
  }

  render() {
    return (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          id="toggle-all"
          onChange={this.props.checkAll}
          ref={this.checkAllBtn}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list" id="todos-wrapper">
          {this.props.tasks && this.props.tasks.map(t => {
            return (
              <Task
                key={t.id}
                task={t}
                deleteTask={this.props.deleteTask}
                completeTask={this.props.completeTask}
                toggleEditMode={this.props.toggleEditMode}
                updateValue={this.props.updateValue}
              />
            )
          })}
        </ul>

      </section>
    )
  }
}

export default Todo