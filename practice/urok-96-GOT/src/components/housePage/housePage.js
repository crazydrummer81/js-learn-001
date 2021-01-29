import React, {Component} from 'react';
import GOTService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import RowBlock from '../rowBlock';
import './housePage.css';

export default class HousePage extends Component {

	gotService = new GOTService();

	state = {
		selectedHouse: 9,
		error: false
	}

	componentDidCatch() {
		console.log('error');
		this.setState({error: true})
  	}


	onItemSelected = (id) => {
		this.setState({
			 selectedHouse: id
		});
  	}

	render() {

		if (this.state.error) {
			return <ErrorMessage/>
		}

		const itemList = (
			<ItemList 
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllHouses}
				renderItem={({name, region}) => `${name} (${region})`}/>
		)

		const itemDetails = (
			<ItemDetails itemId={this.state.selectedHouse} itemType='house'>
				<Field field='name'             label='Name'/>
				<Field field='words'            label='Words'/>
				<Field field='titles'           label='Titles'/>
				<Field field='overlord'         label='Overlord'/>
				<Field field='ancestralWeapons' label='AncestralWeapons'/>
			</ItemDetails>
		)

		return(
			<RowBlock left={itemList} right={itemDetails}/>
		)
	}
}