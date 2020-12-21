import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
// import style from './app.mnpmodule.css';
import styled from 'styled-components';

const AppBlock = styled.div`
	.app {
		margin: 0 auto;
		max-width: 800px;
	}
`;

// Наследование
const StyledAppBlock = styled(AppBlock)`
	/* background-color: red; */
`;

export default class App extends Component {

	state = {
		data: [
			{label: 'Goin to learn React', important: true, id: 1},
			{label: 'That is so good', important: false, id: 2},
			{label: 'I need a break...', important: false, id: 3}
		]
	}

	maxId = 4;

	deleteItem = (id) => {
		console.log(id);
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);
			const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
			return {
				data: newArr
			}
		});
	}

	addItem = (body) => {
		const newItem = {
			label: body, 
			important: false,
			id: this.maxId++
		}
		this.setState(({data}) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}
		})
	}

	render() {
		return (
			<StyledAppBlock>
				<AppHeader/>
				<div className="search-panel d-flex">
					<SearchPanel/>
					<PostStatusFilter/>
				</div>
				<PostList
					posts={this.state.data}
					onDelete={this.deleteItem}/>
				<PostAddForm
					onAdd={this.addItem}/>
			</StyledAppBlock>
		)
	};

}
