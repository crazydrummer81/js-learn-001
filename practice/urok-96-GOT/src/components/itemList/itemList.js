import React, {Component} from 'react';
import Preloader from '../preloader';
import './itemList.css';

export default class ItemList extends Component {

    state = {
        itemList: [],
        activeitem: 0
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                // console.log('itemList', itemList);
                this.setState({
                    itemList: itemList
                });
            });
    }

    renderItems(arr) {
        return arr.map((item,i) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            const className = `list-group-item${this.state.activeitem === i ? ' active' : ''}`;
            return (
                <li 
                    key={id}
                    className={className}
                    onClick={() => {this.props.onItemSelected(id); this.setState({activeitem: i});}}>
                    {label}
                </li>
            );
        });
    }

    render() {

        const {itemList} = this.state;
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {!itemList ? <Preloader/> : null}
                {items}
            </ul>
        );
    }
}