import { render } from '@testing-library/react';
import React, { Component } from 'react';

import './post-list-item.css';

export default class PostListItem extends Component {
	state = {
		important: false,
		like: false
	}

	onImportant = () => {
		this.setState(({important}) => ({
			important: !important
		}))
	}

	onLike = () => {
		this.setState(({like}) => ({
			like: !like
		}))
	}

	render() {
		const {label, onDelete} = this.props;
		const {important, like} = this.state;
		let classNames = 'app-list-item d-flex justify-content-between';

		if (important) {
			classNames += ' important';
		}

		if (like) {
			classNames += ' like';
		}

		return (
			<div className={classNames}>
				<span
					className="app-list-item-label"
					onDoubleClick={this.onLike}>
					{label}
				</span>
				<div className="d-flex judtify-content-center align-items-center">
					<button
						type="button"
						className="btn-star btn-sm"
						onClick={this.onImportant}>
						<i className="fa fa-star"></i>
					</button>
					<button
						type="button"
						className="btn-trash btn-sm"
						onClick={onDelete}>
						<i className="fa fa-trash-o"></i>
					</button>
					<i
						className="icon-heart"
						onClick={this.onLike}></i>
				</div>
			</div>
		)
	}
}
