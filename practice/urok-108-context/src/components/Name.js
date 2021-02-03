import React, { Component } from 'react';
import MyContext from './Context';
import Context from './Context';

class Name extends Component {
	render() {
		const {name, age} = this.context;
		return(
			<div className="name">
				My name is {name},
				Age {age}
			</div>
		)
	};
};

Name.contextType = MyContext;

export default Name;