import React, {Component} from 'react';
import './itemDetails.css';
import GOTService from '../../services/gotService';
import Preloader from '../preloader';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    const value = !isLink(item[field]) ? item[field] : <a href={item[field]}>{item[field]}</a>;
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{value}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new GOTService();

    state = {
        item: {},
        loading: true,
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
                <h4>
                    <ArrowBack onClick={() => {
                        console.log('goBack');
                        this.props.history.goBack()
                    }}></ArrowBack>
                    {name}
                </h4>
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

const ArrowBack = () => {
    return(
        <span className="arrow-back">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
            </svg>
        </span>
    )
}

function isLink(v) {
    if (typeof(v) !== 'string') return false;
    const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    return v.match(regex);
}