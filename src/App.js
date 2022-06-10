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
      itemsLeft: 0
    }
    this.createNewTasks = this.createNewTasks.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.completeTask = this.completeTask.bind(this)
    this.checkAll = this.checkAll.bind(this)
    this.updateLocal = this.updateLocal.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)
    this.currentPage = this.currentPage.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateAllTasks = this.updateAllTasks.bind(this)
  }

  componentDidMount() {
    this.props.history.push('/all')
    this.currentPage();
    this.setState({ itemsLeft: JSON.parse(localStorage.getItem('tasks') || []).length })
  }

  currentPage() {
    const { pathname } = this.props.history.location
    if (pathname.includes('all')) {
      const newTasks = JSON.parse(localStorage.getItem('tasks') || [])
      this.setState({
        tasks: [...newTasks],
      })
    }
    if (pathname.includes('active')) {
      const newTasks = JSON.parse(localStorage.getItem('tasks') || []).filter((t) => t.completed === false);
      this.setState({
        tasks: [...newTasks],
      })
    }
    if (pathname.includes('completed')) {
      const newTasks = JSON.parse(localStorage.getItem('tasks') || []).filter((t) => t.completed === true);
      this.setState({
        tasks: [...newTasks],
      })
    }
  }

  updateLocal(newTasks) {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    this.setState({ itemsLeft: (JSON.parse(localStorage.getItem('tasks') || [])).filter(t => t.completed === false).length })
  }

  updateAllTasks(newTasks) {
    this.updateLocal(newTasks);
    this.currentPage();
  }

  createNewTasks(newTask) {
    const fromLocal = JSON.parse(localStorage.getItem('tasks') || []);
    this.setState({ tasks: [...fromLocal, newTask] }, () => {
      this.updateAllTasks(this.state.tasks)
    });
  }

  deleteTask(id) {
    const newTasks = JSON.parse(localStorage.getItem('tasks') || []).filter(t => t.id !== id);
    this.setState({ tasks: [...newTasks] }, () => {
      this.updateAllTasks(this.state.tasks)
    });
  }

  clearCompleted() {
    const newTasks = JSON.parse(localStorage.getItem('tasks')).filter((t) => t.completed === false);;
    this.setState({ tasks: [...newTasks] }, () => {
      this.updateAllTasks(this.state.tasks)
    });
  }

  completeTask(id) {
    const fromLocal = JSON.parse(localStorage.getItem('tasks'));
    const newTasks = fromLocal.map((t, i) => {
      if (t.id === id) {
        return {
          ...t,
          completed: !t.completed,
        };
      };
      return t;
    });
    this.setState({ tasks: [...newTasks] }, () => {
      this.updateAllTasks(this.state.tasks)
    });
  }

  checkAll() {
    const currentTasks = JSON.parse(localStorage.getItem('tasks'));
    const notCompleted = currentTasks.find(t => t.completed === false);
    const newTasks = currentTasks.map(t => {
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
    this.setState({ tasks: [...newTasks] }, () => {
      this.updateAllTasks(this.state.tasks)
    })
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
    this.setState({ tasks: [...newTasks] }, () => {
      input && input.current.focus()
    });
  }

  updateValue(id, description) {
    this.toggleEditMode(id)
    const fromLocal = JSON.parse(localStorage.getItem('tasks') || []);
    const newTask = fromLocal.map(t => {
      if (t.id === id) {
        return {
          ...t,
          description: description
        }
      }
      return t
    })
    this.updateAllTasks(newTask)
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
          tasks={this.state.tasks}
          itemsLeft={this.state.itemsLeft}
          clearCompleted={this.clearCompleted}
          currentPage={this.currentPage}
        />
      </section>
    )
  };
}

export default withRouter(App);