import React, {Component} from 'react';
import GOTService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import RowBlock from '../rowBlock';
import './bookPage.css';

export default class BookPage extends Component {

	gotService = new GOTService();

	state = {
		selectedBook: 9,
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({error: true})
  }


	onItemSelected = (id) => {
		this.setState({
			 selectedBook: id
		});
  }

	render() {

		if (this.state.error) {
			return <ErrorMessage/>
		}

		const itemList = (
			<ItemList 
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllBooks}
				renderItem={({name, released}) => `${name} (${released})`}/>
		)

		const itemDetails = (
			<ItemDetails itemId={this.state.selectedBook} itemType='book'>
				<Field field='name'           label='Name'/>
				<Field field='numberOfPages'  label='Number of pages'/>
				<Field field='publisher'      label='Publisher'/>
			</ItemDetails>
		)

		return(
			<RowBlock left={itemList} right={itemDetails}/>
		)
	}
}