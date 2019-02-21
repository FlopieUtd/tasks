import React from "react";

class ToDo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    let input;
    e.target.tagName === "INPUT"
      ? (input = e.target)
      : (input = e.target.querySelector("input"));
    input.value !== ""
      ? this.props.updateTodo(this.props.index, input.value)
      : null;
    input.blur();
  };

  render() {
    return (
      <li className={"todo " + (this.props.data.isDone ? "is-done" : "")}>
        <div className="todo-content">
          <form
            onSubmit={this.handleSubmit}
            onBlur={this.handleSubmit}
            className="todo-form"
          >
            <input
              type="text"
              className="todo-value"
              defaultValue={this.props.data.value}
            />
          </form>
          <div className="options">
            <img
              className="icon drag"
              src={"./src/assets/icons/arrows.svg"}
              alt="Move"
            />
            <img
              className="icon"
              src={
                "./src/assets/icons/" +
                (this.props.data.isDone ? "" : "un") +
                "checked.svg"
              }
              alt="Remove"
              onClick={() => this.props.toggleTodoIsDone(this.props.index)}
            />
            <img
              className="icon"
              src="./src/assets/icons/remove.svg"
              alt="Remove"
              onClick={() => this.props.removeTodo(this.props.index)}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default ToDo;
