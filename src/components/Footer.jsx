import React from "react";
import Emitter from "./Emitter";
import { active, all, completed } from "../routes";
import { Context } from "../App";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCompleted: null
    };
    Footer.contextType = Context
  }
  componentDidMount() {
    const { localTasks } = this.context
    const haveCompleted = localTasks.filter(t => t.completed === true).length
    this.setState({ haveCompleted: haveCompleted })
  }

  componentDidUpdate() {
    const { localTasks } = this.context
    const haveCompleted = localTasks.filter(t => t.completed === true).length
    if (haveCompleted !== this.state.haveCompleted) {
      this.setState({ haveCompleted: haveCompleted })
    }
  }

  handleClearCompleted() {
    Emitter.emit('CLEAR_COMPLETED');
  };

  handleClick(path) {
    Emitter.emit('CLICK_FOOTER_BTN', path)
  };

  render() {
    const { localTasks, path, itemsLeft } = this.context

    return (
      <>
        {localTasks.length ? <footer className="footer" id="footer_info_wrapper">
          <span className="todo-count">{`${itemsLeft} items left`}</span>
          <ul className="filters">
            <li>
              <button
                type="button"
                className={`${path === all ? 'activeButton' : ''}`}
                onClick={() => {
                  this.handleClick(all);
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${path === active ? 'activeButton' : ''}`}
                onClick={() => {
                  this.handleClick(active);
                }}
              >
                Active
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${path === completed ? 'activeButton' : ''}`}
                onClick={() => {
                  this.handleClick(completed);
                }}
              >
                Completed
              </button>
            </li>
          </ul>
          <button
            type="button"
            className={`${this.state.haveCompleted ? 'clear-completed visible' : 'hidden'}`}
            onClick={this.handleClearCompleted}
          >
            Clear completed
          </button>
        </footer> : null}
      </>
    )
  }
}

export default Footer;