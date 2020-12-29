import React, { Component } from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {

	state = {
		text: ''
	}

	onValueChange = (e) => {
		// console.log(e.target.value);
		this.setState({
			text: e.target.value
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onAdd(this.state.text)
		this.setState({
			text: ''
		})
	}

	render() {
		return (
			<form 
				className="bottom-panel d-flex"
				onSubmit={this.onSubmit}>
				<input
					type="text"
					placeholder="О чем вы думаете сейчас?"
					className="form-control new-post-label"
					onChange={this.onValueChange}
					value={this.state.text} //! Это свойство делает компонент КОНТРОЛИРУЕМЫМ
				/>
				<button
					type="submit"
					className="btn btn-outline-secondary">
					Добавить
				</button>
			</form>
		)
	}

}
