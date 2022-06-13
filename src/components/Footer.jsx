import React from "react";
import { withRouter } from "react-router-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      haveCompleted: null
    }
    this.setPath = this.setPath.bind(this)
  }
  componentDidMount() {
    const haveCompleted = this.props.localTasks.filter(t => t.completed === true).length
    this.setState({ haveCompleted: haveCompleted })
  }

  componentDidUpdate() {
    const haveCompleted = this.props.localTasks.filter(t => t.completed === true).length
    if (haveCompleted !== this.state.haveCompleted) {
      this.setState({ haveCompleted: haveCompleted })
    }
  }

  setPath(e) {
    this.props.updatePath(e.target.textContent)
  }

  render() {
    const { path, itemsLeft } = this.props.mainState;
    return (
      <>
      {this.props.localTasks ? <footer className="footer" id="footer_info_wrapper">
          <span className="todo-count">{`${itemsLeft} items left`}</span>
          <ul className="filters">
            <li>
              <button
                type="button"
                className={`${path === 'All' ? 'activeButton' : ''}`}
                onClick={this.setPath}
              >
                All
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${path === 'Active' ? 'activeButton' : ''}`}
                onClick={this.setPath}
              >
                Active
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`${path === 'Completed' ? 'activeButton' : ''}`}
                onClick={this.setPath}
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
        </footer> : null }
    </>

    )
  }

}

export default withRouter(Footer) 