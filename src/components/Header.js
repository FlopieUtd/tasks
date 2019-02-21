import React from 'react';

class Header extends React.Component {

  getDoneTasks (todos) {
  	todos.filter(todo => {

  	})
  } 

  render () {
    return (
    	<div className="container">
    		<div className="header">
    			<h1>Tasks</h1>
    			{
    				this.props.totalTodos > 0 ? 
    				<div className="progress">
	    				{this.props.doneTodos} / {this.props.totalTodos} task{ this.props.totalTodos > 1 ? "s" : "" } done
	    			</div> 
	    			: null
    			}
    			
    		</div>
    	</div>
    );
  }
}

export default Header;