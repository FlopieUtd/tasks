import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./css/style.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Header from "./components/Header";
import ToDoCreator from "./components/ToDoCreator";
import ToDo from "./components/ToDo";

class App extends React.Component {
  state = {
    todos: []
  };

  componentDidMount() {
    this.getCachedState();
  }

  componentDidUpdate() {
    console.log("saving");
    this.storeCachedState();
  }

  getCachedState = () => {
    const cachedState = window.localStorage.getItem("state");
    if (cachedState != null) {
      const parsedState = JSON.parse(cachedState);
      const todos = [...this.state.todos];
      parsedState.forEach(todo => todos.push(todo));
      this.setState({ todos });
    }
  };

  storeCachedState = () => {
    const cachedState = JSON.stringify(this.state.todos);
    window.localStorage.setItem("state", cachedState);
  };

  addTodo = todo => {
    const todos = [...this.state.todos];
    todos.push({
      id: `todo${Date.now()}`,
      value: todo,
      isDone: false
    });
    this.setState({ todos });
  };

  updateTodo = (index, todo) => {
    const todos = [...this.state.todos];
    todos[index].value = todo;
    this.setState({ todos });
  };

  toggleTodoIsDone = index => {
    const todos = [...this.state.todos];
    todos[index].isDone == true
      ? (todos[index].isDone = false)
      : (todos[index].isDone = true);
    this.setState({ todos });
  };

  removeTodo = index => {
    let todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({ todos });
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const todos = this.reorder(
      this.state.todos,
      result.source.index,
      result.destination.index
    );

    this.setState({
      todos
    });
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  render() {
    return (
      <div>
        <Header
          doneTodos={this.state.todos.filter(todo => todo.isDone).length}
          totalTodos={this.state.todos.length}
        />
        <ToDoCreator addTodo={this.addTodo} />
        <div className="container">
          <ul className="todos">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    <TransitionGroup className="todo-list">
                      {this.state.todos.map((todo, index) => {
                        return (
                          <CSSTransition
                            key={todo.id}
                            timeout={300}
                            classNames="slide"
                          >
                            <Draggable
                              key={todo.id}
                              draggableId={todo.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <ToDo
                                    key={todo.id}
                                    index={index}
                                    data={todo}
                                    updateTodo={this.updateTodo}
                                    removeTodo={this.removeTodo}
                                    toggleTodoIsDone={this.toggleTodoIsDone}
                                  />
                                </div>
                              )}
                            </Draggable>
                          </CSSTransition>
                        );
                      })}
                    </TransitionGroup>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
