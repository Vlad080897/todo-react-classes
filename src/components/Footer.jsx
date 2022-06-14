import React from "react";
import { active, all, completed } from "../routes";

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      haveCompleted: null,
    };
    this.setPath = this.setPath.bind(this)
  }
  componentDidMount() {
    const haveCompleted = this.props.localTasks.filter(t => t.completed === true).length;
    this.setState({ haveCompleted: haveCompleted });
  };

  componentDidUpdate() {
    const haveCompleted = this.props.localTasks.filter(t => t.completed === true).length
    if (haveCompleted !== this.state.haveCompleted) {
      this.setState({ haveCompleted: haveCompleted })
    };
  };

  getTasksFromLocal() {
    return (JSON.parse(localStorage.getItem('tasks')) || []);
  };

  setPath(path) {
    this.props.updatePath(path)
  }

  render() {
    const { itemsLeft, path } = this.props.mainState

    return (
      <>
        {this.props.localTasks.length ? <footer className="footer" id="footer_info_wrapper" >
          <span className="todo-count">{`${itemsLeft} items left`}</span>
          <ul className="filters">
            <li>
              <button
                type="button"
                className={`${path === all ? 'activeButton' : ''}`}
                onClick={() => { this.setPath(all) }}
              >
                All
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${path === active ? 'activeButton' : ''}`}
                onClick={() => { this.setPath(active) }}
              >
                Active
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${path === completed ? 'activeButton' : ''}`}
                onClick={() => this.setPath(completed)}
              >
                Completed
              </button>
            </li>
          </ul>
          <button
            type="button"
            className={`${this.state.haveCompleted ? 'clear-completed visible' : 'hidden'}`}
            onClick={this.props.clearCompleted}
          >
            Clear completed
          </button>
        </footer > : null}
      </>
    )
  }
}

export default Footer