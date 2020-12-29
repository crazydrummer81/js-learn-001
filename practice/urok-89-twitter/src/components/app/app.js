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
			{label: 'Goin to learn React', important: true, like: false, id: 1},
			{label: 'That is so good', important: false, like: false, id: 2},
			{label: 'I need a break...', important: false, like: false, id: 3}
		],
		term: '', // Строка поиска
		filter: 'all'
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

	toggleStatus = (key, id) => {
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

	searchPost = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.label
				.toLowerCase()
				.indexOf(term.toLowerCase()) > -1;
		});
	}

	onUpdateSearch = (term) => {
		this.setState({term});
	}

	filterPost = (items, filter) => {
		if (filter === 'like') {
			return items.filter(item => item.like);
		} else {
			return items;
		}
	}

	onFilterSeleсt = (filter) => {
		this.setState({filter});
	}


	render() {
		const {data, term, filter} = this.state;
		const liked = data.filter(item => item.like).length;
		const allPosts = data.length;
		const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

		return (
			<StyledAppBlock>
				<AppHeader
					liked={liked}
					allPosts={allPosts}/>
				<div className="search-panel d-flex">
					<SearchPanel
						onUpdateSearch={this.onUpdateSearch}
					/>
					<PostStatusFilter
						filter={filter}
						onFilterSelect={this.onFilterSeleсt}
					/>
				</div>
				<PostList
					posts={visiblePosts}
					onDelete={this.deleteItem}
					onToggleImportant={(id) => this.toggleStatus('important', id)}
					onToggleLiked={(id) => this.toggleStatus('like', id)}/>
				<PostAddForm
					onAdd={this.addItem}/>
			</StyledAppBlock>
		)
	};

}
