import React from 'react';

class ToDoCreator extends React.Component {

	handleSubmit = (e) => {
		e.preventDefault();
		const input = e.target.querySelector('input');
		this.props.addTodo(input.value);
		input.value = '';
	}

  render () {
    return (
    	<form className="container" onSubmit={this.handleSubmit}>
    		<input 
    			className="to-do-creator"
    			type="text" 
    			placeholder="Create a new task"
    		/>
    	</form>
    );
  }
}

export default ToDoCreator;