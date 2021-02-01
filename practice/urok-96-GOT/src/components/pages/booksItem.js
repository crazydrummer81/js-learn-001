import React, {Component} from 'react';
import GOTService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {
	gotService = new GOTService();

	render() {
		return (
			<ItemDetails itemId={this.props.bookId} itemType='book'>
				<Field field='name'           label='Name'/>
				<Field field='numberOfPages'  label='Number of pages'/>
				<Field field='publisher'      label='Publisher'/>
			</ItemDetails>
		)
	}
}