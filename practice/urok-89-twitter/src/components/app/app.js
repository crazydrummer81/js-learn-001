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
			{label: 'Goin to learn React', important: true, id: 1, like: false},
			{label: 'That is so good', important: false, id: 2, like: false},
			{label: 'I need a break...', important: false, id: 3, like: false}
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

	// onToggleImportant = (id) => {
	// 	console.log('onToggleImportant(id)', id);
	// 	this.setState(({data}) => {
	// 		const index = data.findIndex(elem => elem.id === id);
	// 		const old = data[index];
	// 		const newItem = {...old, important: !old.important};

	// 		const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

	// 		return {
	// 			data: newArr
	// 		}
	// 	});
	// }

	// onToggleLiked = (id) => {
	// 	console.log('onToggleLiked(id)', id);
	// 	this.setState(({data}) => {
	// 		const index = data.findIndex(elem => elem.id === id);
	// 		const old = data[index];
	// 		const newItem = {...old, like: !old.like};

	// 		const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

	// 		return {
	// 			data: newArr
	// 		}
	// 	});
	// }

	onToggle = (key, id) => {
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);
			const old = data[index];
			const newItem = {...old};
			newItem[key] = !old[key]

			const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

			return {
				data: newArr
			}
		});
	}


	render() {
		const {data} = this.state;
		const liked = data.filter(item => item.like).length;
		const allPosts = data.length;

		return (
			<StyledAppBlock>
				<AppHeader
					liked={liked}
					allPosts={allPosts}/>
				<div className="search-panel d-flex">
					<SearchPanel/>
					<PostStatusFilter/>
				</div>
				<PostList
					posts={this.state.data}
					onDelete={this.deleteItem}
					onToggleImportant={(id) => this.onToggle('important', id)}
					onToggleLiked={(id) => this.onToggle('like', id)}/>
				<PostAddForm
					onAdd={this.addItem}/>
			</StyledAppBlock>
		)
	};

}
