import React, { Component } from 'react'
import '../index.css'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState(() => ({ value: e.target.value }))
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewTasks({
      id: Date.now(),
      description: this.state.value,
      completed: false,
      isEdit: false
    })
    this.setState(() => ({ value: '' }))
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="text"
            onBlur={() => null}
            className="new-todo"
            id="main_input"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.value} 
            onChange={this.handleChange} />
        </form>
      </header>
    )
  }
}
