import React, {Component} from 'react';
import './itemDetails.css';
import GOTService from '../../services/gotService';
import Preloader from '../preloader';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new GOTService();

    state = {
        item: null,
        loading: false,
        error: false,
        errorMessage: null,
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        this.setState({loading: true, error: false});
        const {itemType, itemId} = this.props;
        if (!itemId) {
            return;
        }

        console.log('itemId', itemId);

        this.gotService.getItem(itemType, itemId)
            .then((item) => {
                // console.log('item', item);
                this.setState({item, loading: false, errorMessage: null});
            })
            .catch((err) => {
                console.log('err', err);
                this.setState({error: true, errorMessage: '404', loading: false, item: {}});

            });
        // this.foo.bar = 0;
    }

    render() {
        
        if (!this.state.item) {
            return <span className='select-error'>Prease select item</span>
        }

        const {item, errorMessage} = this.state;
        const {name} = item;

        return (
            <div className="item-details rounded">
                {this.state.loading ? <Preloader/> : null}
                {this.state.error ? <ErrorMessage message={errorMessage}/> : null}
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}