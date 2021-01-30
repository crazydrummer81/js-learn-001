import React, {Component} from 'react';
import GOTService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

	gotService = new GOTService();

	state = {
		selectedChar: 130,
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({error: true})
  }


	onItemSelected = (id) => {
		this.setState({
			 selectedChar: id
		});
  }

	render() {

		if (this.state.error) {
			return <ErrorMessage/>
		}

		const itemList = (
			<ItemList 
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={({name, gender}) => `${name || ''} ${gender ? `(${gender})` : ''}`}/>
		)

		const itemDetails = (
			<ItemDetails itemId={this.state.selectedChar} itemType='character'>
				<Field field='gender'  label='Gender'/>
				<Field field='born'    label='Born'/>
				<Field field='died'    label='Died'/>
				<Field field='culture' label='Culture'/>
			</ItemDetails>
		)

		return(
			<RowBlock left={itemList} right={itemDetails}/>
		)
	}
}