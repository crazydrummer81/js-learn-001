import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import ProgressBar from '../progressBar';

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

    gotService = new gotService();

    state = {
        char: {},
        progress: {
            value: 0,
            interval: 0
        }
    }

    onCharLoaded = (char) => {
        this.setState({char});
    }

    updateChar() {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded);
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
        const {name, gender, born, died, culture, id} = this.state.char;
        const {value, interval} = this.state.progress;

        return (
            <div className="random-block rounded">
                <h4>{name}</h4>
                <ProgressBar
                    progress={value}
                    interval={interval}/>
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
            </div>
        );
    }
}
