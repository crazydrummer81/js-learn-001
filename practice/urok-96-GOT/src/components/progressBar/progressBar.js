import React, { Component } from 'react';
import './progressBar.css';

export default class ProgressBar extends Component {

	render() {
		const style = {
			width: this.props.progress + '%'
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
