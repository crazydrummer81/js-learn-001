import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import ProgressBar from '../progressBar';
import Preloader from '../preloader';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateChar();
        let t = 5000;
        this.initProgressBar(t);
        setInterval(() => {
            this.updateChar();
            this.initProgressBar(t);
        }, t);
    }

    state = {
        char: {},
        loading: true,
        progress: {
            value: 0,
            interval: 0
        },
        error: false,
        errorMessage: ''
    }
    gotService = new gotService();


    onCharLoaded(char) {
        this.setState({
            char,
            loading: false,
            error: false,
            errorMessage: ''
        });
    }

    onError(err) {
        this.setState({
            error: true,
            loading: false,
            errorMessage: err.message
        });
    }

    updateChar() {
        this.setState({loading: true});
        sleep(1000).then(() => {
            const id = Math.floor(Math.random()*140 + 25);
            this.gotService.getCharacter(id)
                .then((char) => this.onCharLoaded(char))
                .catch((err) => this.onError(err))
        })
    }

    initProgressBar(t) {
        let v = 0;
        const i = Math.floor(t/100);
        const int = setInterval(() => {
            this.updateProgress(v++, i);
            if (v >= 100) clearInterval(int);
        }, i);
    }

    updateProgress(v, i) {
        this.setState({progress: {value: v, interval: i}});
    }

    render() {
        const {char, loading, progress, error, errorMessage} = this.state;
        const {value, interval} = this.state.progress;

        const preloader = loading ? <Preloader/> : null;
        const message = error ? <ErrorMessage message={errorMessage}/> : null;

        return (
            <div className="random-block rounded">
                <ProgressBar
                    progress={value}
                    interval={interval}/>
                {preloader}
                {message}
                <View char={char} progress={progress}/>
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture, id, loading} = char;
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