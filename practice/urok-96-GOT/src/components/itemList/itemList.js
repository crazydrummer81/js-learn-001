import React, {Component} from 'react';
import Preloader from '../preloader';
import './itemList.css';
import PropTypes from 'prop-types';
import GOTService from '../../services/gotService';

class ItemList extends Component {

    state = {
        activeitem: null,
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
        const {data, loading} = this.props;
        const items = this.renderItems(data);
        console.log('items', items);
        return (
            <ul className="item-list list-group">
                {loading ? <Preloader/> : null}
                {items}
            </ul>
        );
    }
}

ItemList.defaultProps = {
    onItemSelected: () => {console.log('ItemList.defaultProps onItemSelected()')},
}

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: range(1,6).map((i) => ({id:i})),
            loading: true
        }

        static propTypes = {
            onItemSelected: PropTypes.func,
        }
    
        componentDidMount() {
    
            getData()
                .then((data) => {
                    console.log('data', data);
                    this.setState({
                        data: data,
                        loading: false
                    });
                });
        }

        render() {
            const {data, loading} = this.state;
            
            return <View {...this.props} data={data} loading={loading}/>
        }
    };
}

const {getAllCharacters} = new GOTService();
export default withData(ItemList, getAllCharacters);


//---------------------------------------------------
function range(start, end) {
    let res = [];
    for (let i = start; i <= end; i++) {
        res.push(i);
    }
    return res;
}