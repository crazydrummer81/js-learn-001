import React, { Component } from 'react';
import './errorMessage.css';

export default class Preloader extends Component {
	render() {
		const errorMessage = this.props.message;
		return(
			<div className="overlay">
				<div className="error-message">
					<span>Что-то пошло не так...</span><br/>
					<span>{errorMessage}</span>
				</div>
			</div>
		);
		
	};
};
