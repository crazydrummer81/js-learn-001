import React, {Component} from 'react';
import './randomChar.css';
import GOTService from '../../services/gotService';
import ProgressBar from '../progressBar';
import Preloader from '../preloader';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {

    state = {
        char: {},
        progress: 0,
        loading: true,
        error: false,
        errorMessage: ''
    }
    interval = this.props.interval;
    gotService = new GOTService();

    componentDidMount() {
        // console.log('componentDidMount');
        this.updateChar();

        this.intervalId = setInterval(() => {
            this.updateChar();

        }, this.interval);
    }
    
    componentWillUnmount() {
        // console.log('componentWillUnmount');
        clearInterval(this.intervalId);
        clearInterval(this.progressIntervalId);
    }

    onCharLoaded(char) {
        this.setState({
            char,
            loading: false,
            error: false,
            errorMessage: ''
        });
        this.initProgressBar();
    }

    onError(err) {
        this.setState({
            error: true,
            loading: false,
            errorMessage: err.message
        });
    }

    updateChar() {
        // console.log('UPDATE');
        clearInterval(this.progressIntervalId);
        this.setState({loading: true, progress: 0});
        const id = Math.floor(Math.random()*140 + 25);
        // const id = 10000;
        this.gotService.getItem('character', id)
            .then((char) => {
                this.onCharLoaded(char);
            })
            .catch((err) => this.onError(err))
    }

    
	initProgressBar() {
        // console.log('initProgressBar');
        // console.log('this.interval', this.interval);
        this.setState({
            progress: 0
        })
		const step = Math.floor(this.interval/100);
		this.progressIntervalId = setInterval(() => {
			this.setState({
				progress: this.state.progress + 1
			});
            if (this.state.progress >= 100) clearInterval(this.progressIntervalId);
            // console.log('this.state.progress', this.state.progress);
		}, step);
    }


    render() {
        // console.log('RENDER');
        const {char, loading, progress, error, errorMessage} = this.state;

        const preloader = loading ? <Preloader/> : null;
        const message = error ? <ErrorMessage message={errorMessage}/> : null;

        return (
            <div className="random-block rounded">
                <ProgressBar
                    value={progress}/>
                {preloader}
                {message}
                <View char={char}/>
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 2000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, culture, id} = char;
    return(
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">ID </span>
                    <span>{id}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
} 


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}