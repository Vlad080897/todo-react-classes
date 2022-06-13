import React from "react";
import { withRouter } from "react-router-dom";
import Emitter from "./Emitter";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCompleted: null
    };
    this.getTasksFromLocal = this.getTasksFromLocal.bind(this);
  }
  componentDidMount() {
    const haveCompleted = this.getTasksFromLocal().filter(t => t.completed === true).length
    this.setState({ haveCompleted: haveCompleted })
  }

  componentDidUpdate() {
    const haveCompleted = this.getTasksFromLocal().filter(t => t.completed === true).length
    if (haveCompleted !== this.state.haveCompleted) {
      this.setState({ haveCompleted: haveCompleted })
    }
  }

  handleClearCompleted() {
    Emitter.emit('CLEAR_COMPLETED');
  };

  handleClick() {
    Emitter.emit('CLICK_FOOTER_BTN')
  };

  getTasksFromLocal() {
    return (JSON.parse(localStorage.getItem('tasks')) || []);
  };

  render() {
    const fromLocal = this.getTasksFromLocal().length;
    const { pathname } = this.props.history.location;

    if (fromLocal) {
      return (
        fromLocal &&
        <footer className="footer" id="footer_info_wrapper">
          <span className="todo-count">{`${this.props.itemsLeft} items left`}</span>
          <ul className="filters">
            <li>
              <button
                type="button"
                className={`${pathname.includes('all') ? 'activeButton' : ''}`}
                onClick={() => {
                  this.props.history.push("/all");
                  this.handleClick();
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${pathname.includes('active') ? 'activeButton' : ''}`}
                onClick={() => {
                  this.props.history.push("/active");
                  this.handleClick();
                }}
              >
                Active
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${pathname.includes('completed') ? 'activeButton' : ''}`}
                onClick={() => {
                  this.props.history.push("/completed");
                  this.handleClick();
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
        </footer>
      )
    }
  }

}

export default withRouter(Footer) 