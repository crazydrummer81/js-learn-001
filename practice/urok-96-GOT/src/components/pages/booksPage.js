import React, {Component} from 'react';
import GOTService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import {withRouter} from 'react-router-dom';

class BooksPage extends Component {

	gotService = new GOTService();

	state = {
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({error: true})
  }


	render() {

		if (this.state.error) {
			return <ErrorMessage/>
		}

		return(
			<ItemList 
				onItemSelected={(itemId) => {
					console.log(itemId);
					this.props.history.push(`${itemId}`);
				}}
				getData={this.gotService.getAllBooks}
				renderItem={({name, released}) => `${name} (${released})`}/>
		)
	}
}

export default withRouter(BooksPage);