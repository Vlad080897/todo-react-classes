import React from "react";
import { withRouter } from "react-router-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      haveCompleted: null
    }
  }
  componentDidMount() {
    const haveCompleted = JSON.parse(localStorage.getItem('tasks')).filter(t => t.completed === true).length
    this.setState({ haveCompleted: haveCompleted })
  }

  componentDidUpdate() {
    const haveCompleted = JSON.parse(localStorage.getItem('tasks')).filter(t => t.completed === true).length
    if (haveCompleted !== this.state.haveCompleted) {
      this.setState({ haveCompleted: haveCompleted })
    }
  }

  render() {
    const fromLocal = JSON.parse(localStorage.getItem('tasks') || []).length;
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
                  this.props.currentPage();
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
                  this.props.currentPage();
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
                  this.props.currentPage();
                }}
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
        </footer>
      )
    }
  }

}

export default withRouter(Footer) 