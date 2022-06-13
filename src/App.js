import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Todo from "./components/Todo";
import { withRouter } from "react-router-dom";
import './index.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      itemsLeft: 0,
      path: 'All',
    }
    this.createNewTasks = this.createNewTasks.bind(this)
    this.updateLocal = this.updateLocal.bind(this)
    this.updateState = this.updateState.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.completeTask = this.completeTask.bind(this)
    this.checkAll = this.checkAll.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updatePath = this.updatePath.bind(this)
    this.localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  updateLocal(newTasks) {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    this.localTasks = newTasks;
  }

  updateState(newState) {
    const itemsLeft = this.localTasks.filter(
      (t) => t.completed === false
    ).length;
    const activeTasks = this.localTasks.filter(t => !t.completed)
    const completedTasks = this.localTasks.filter(t => t.completed)

    if (newState.path === 'Active') {
      this.setState({
        ...newState,
        tasks: activeTasks,
        itemsLeft,
      })
    } else if (newState.path === 'Completed') {
      this.setState({
        ...newState,
        tasks: completedTasks,
        itemsLeft,
      })
    } else {
        this.setState({
          ...newState,
          tasks: this.localTasks,
          itemsLeft,
      })
    }
  }

  createNewTasks(newTask) {
    const newState = {
      ...this.state,
      tasks: [...this.localTasks, newTask],
    }
    this.updateLocal(newState.tasks)
    this.updateState(newState)
  }

  deleteTask(id) {
    const newTasks = this.localTasks.filter((t) => t.id !== id);
    const newState = {
      ...this.state,
      tasks: newTasks,
    }
    this.updateLocal(newState.tasks)
    this.updateState(newState)
  }

  clearCompleted() {
    const newTasks = this.localTasks.filter((t) => t.completed === false);
    const newState = {
      ...this.state,
      tasks: newTasks,
    }
    this.updateLocal(newState.tasks)
    this.updateState(newState)
  }

  completeTask(id) {
    const newTasks = this.localTasks.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          completed: !t.completed,
        };
      };
      return t;
    });
    const newState = {
      ...this.state,
      tasks: newTasks,
    }
    this.updateLocal(newState.tasks)
    this.updateState(newState)
  }

  checkAll() {
    const notCompleted = this.localTasks.find(t => t.completed === false);
    const newTasks = this.localTasks.map(t => {
      if (notCompleted) {
        return {
          ...t,
          completed: true,
        }
      }
      return {
        ...t,
        completed: false,
      };
    });
    const newState = {
      ...this.state,
      tasks: newTasks,
    }
    this.updateLocal(newState.tasks)
    this.updateState(newState)
  }

  toggleEditMode(id, input) {
    const newTasks = this.state.tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          isEdit: !t.isEdit
        }
      }
      return t
    })

    const newState = {
      ...this.state,
      tasks: newTasks,
    }
    this.updateLocal(newState.tasks)
    this.updateState(newState)

    if (input) {
      input.current.focus()
    }
  }

  updateValue(id, description) {
    this.toggleEditMode(id)
    const newTasks = this.localTasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          description: description
        }
      }
      return t
    })

    const newState = {
      ...this.state,
      tasks: newTasks,
    }
    this.updateLocal(newState.tasks)
    this.updateState(newState)
  }

  updatePath(path) {
    const newState = {
      ...this.state,
      path,
    }
    this.updateState(newState)
  }

  componentDidMount() {
    const newState = {
      ...this.state,
      tasks: [...this.localTasks],
    }
    this.updateState(newState)
  }

  render() {
    return (
      <section className="todoapp">
        <Header
          createNewTasks={this.createNewTasks}
        />
        <Todo
          tasks={this.state.tasks}
          deleteTask={this.deleteTask}
          completeTask={this.completeTask}
          checkAll={this.checkAll}
          toggleEditMode={this.toggleEditMode}
          updateValue={this.updateValue}
        />
        <Footer
          mainState={this.state}
          localTasks={this.localTasks}
          clearCompleted={this.clearCompleted}
          updatePath={this.updatePath}
        />
      </section>
    )
  };
}

export default withRouter(App);
