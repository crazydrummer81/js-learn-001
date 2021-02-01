import React, { Component } from 'react';
import './progressBar.css';

export default class ProgressBar extends Component {

	render() {
		// console.log('ProgressBar', this.props.value);
		const style = {
			width: this.props.value + '%'
		};
		return(
			<div className='m2progress-bar'>

				<div 
					className='m2progress-bar__fill'
					style={style}>
				</div>

			</div>
		)
	}
}
