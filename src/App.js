import React from "react";
import { withRouter } from "react-router-dom";
import Emitter from "./components/Emitter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { active, all, completed } from "./routes";
import Todo from "./components/Todo";
import './index.css';

export const Context = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      itemsLeft: 0,
      path: all
    }
    this.createNewTasks = this.createNewTasks.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.completeTask = this.completeTask.bind(this)
    this.checkAll = this.checkAll.bind(this)
    this.updateLocal = this.updateLocal.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updatePath = this.updatePath.bind(this)
    this.init = this.init.bind(this)
    this.localTasks = (JSON.parse(localStorage.getItem("tasks")) || [])
  }

  componentDidMount() {
    const newState = {
      ...this.state,
      tasks: [...this.localTasks]
    };
    this.updateState(newState);
    this.init();
  };

  init() {
    Emitter.on('ADD_NEW_TASK_INPUT', (newTask) => this.createNewTasks(newTask));
    Emitter.on('DELETE_TASK', (id) => {
      this.deleteTask(id);
    });
    Emitter.on('COMPLETE_TASK', (id) => {
      this.completeTask(id);
    });
    Emitter.on('CHECK_ALL', this.checkAll);
    Emitter.on('TOGGLE_EDIT_MODE', ({ id, inputRef }) => {
      this.toggleEditMode(id, inputRef);
    });
    Emitter.on('UPDATE_VALUE', ({ id, value, isBlur, input }) => {
      if (isBlur) {
        this.toggleEditMode()
      }
      this.updateValue(id, value);
    });
    Emitter.on('CLEAR_COMPLETED', this.clearCompleted);
    Emitter.on('CLICK_FOOTER_BTN', (path) => {
      this.updatePath(path)
    });
  }

  updateState(newState) {
    const itemsLeft = this.localTasks.filter(
      (t) => t.completed === false
    ).length;
    const activeTasks = this.localTasks.filter(t => t.completed === false);
    const completedTasks = this.localTasks.filter(t => t.completed === true)
    if (newState.path === active) {
      this.setState({
        ...newState,
        tasks: activeTasks,
        itemsLeft
      });
      return;
    };
    if (newState.path === completed) {
      this.setState({
        ...newState,
        tasks: completedTasks,
        itemsLeft
      });
      return;
    };
    this.setState({
      ...newState,
      tasks: this.localTasks,
      itemsLeft
    });
  };

  updatePath(path) {
    const newState = {
      ...this.state,
      path,
    }
    this.updateState(newState)
  };

  updateLocal(newTasks) {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    this.localTasks = newTasks;
  }

  createNewTasks(newTask) {
    const newState = {
      ...this.state,
      tasks: [...this.localTasks, newTask]
    };
    this.updateLocal(newState.tasks);
    this.updateState(newState);
  }

  deleteTask(id) {
    const newTasks = this.localTasks.filter(t => t.id !== id);
    const newState = {
      ...this.state,
      tasks: [...newTasks]
    };
    this.updateLocal(newTasks);
    this.updateState(newState);
  }

  clearCompleted() {
    const newTasks = this.localTasks.filter((t) => t.completed === false);
    const newState = {
      ...this.state,
      tasks: [...newTasks]
    };
    this.updateLocal(newTasks);
    this.updateState(newState);
  }

  completeTask(id) {
    const newTasks = this.localTasks.map(t => {
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
      tasks: newTasks
    };
    this.updateLocal(newTasks);
    this.updateState(newState);
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
      tasks: [...newTasks]
    }
    this.updateLocal(newTasks);
    this.updateState(newState);
  }

  async toggleEditMode(id, input) {
    const newTasks = this.localTasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          isEdit: !t.isEdit
        };
      };
      return t;
    });

    const newState = {
      ...this.state,
      tasks: [...newTasks]
    };
    this.updateLocal(newTasks);
    await this.updateState(newState);
    if (input) {
      input.current.focus();
    };
  };

  updateValue(id, description) {
    this.toggleEditMode(id);
    const newTask = this.localTasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          description: description,
        };
      };
      return t;
    });
    const newState = {
      ...this.state,
      tasks: [...newTask]
    };
    this.updateLocal(newTask);
    this.updateState(newState);
  };

  render() {
    return (
      <Context.Provider value={{
        ...this.state,
        localTasks: this.localTasks,
      }}>
        <section className="todoapp">
          <Header />
          <Todo />
          <Footer />
        </section>
      </Context.Provider>
    )
  };
}

export default withRouter(App);
