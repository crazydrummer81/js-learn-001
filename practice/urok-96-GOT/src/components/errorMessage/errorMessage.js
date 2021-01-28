import React, { Component } from 'react';
import './errorMessage.css';
import {ReactComponent as ErrorImage} from './emoji-worried-face.svg';

export default class ErrorMessage extends Component {
	render() {
		const errorMessage = this.props.message;
		return(
			<div className="overlay relative">
				<div className="error-message">
					<ErrorImage/>
					<span className="error-message__heding">Что-то пошло не так...</span>
					<span className="error-message__content">{errorMessage}</span>
				</div>
			</div>
		);
		
	};
};
